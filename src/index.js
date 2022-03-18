const crypto = require("crypto");
const axios = require("axios");

// 更多使用详情阅见：https://open.dingtalk.com/document/group/custom-robot-access
class Robot_DD {
  constructor(initData) {
    const {
      access_token,
      secret,
      base_url = "https://oapi.dingtalk.com/robot/send",
    } = initData || {};
    if (!secret) {
      // 未加签时请求链接
      this._webhookUrl = `${base_url}?access_token=${access_token}`;
      return;
    }
    const timestamp = Date.now();
    const sign = this.newSign(secret, `${timestamp}\n${secret}`);
    this._webhookUrl = `${base_url}?access_token=${access_token}&timestamp=${timestamp}&sign=${sign}`;
  }

  newSign(secret, content) {
    const str = crypto
      .createHmac("sha256", secret)
      .update(content)
      .digest()
      .toString("base64");
    return encodeURIComponent(str);
  }

  static newUrl(url, pc_slide = false) {
    // 消息链接在PC端侧边栏或外部浏览器打开
    // 详情阅见：https://open.dingtalk.com/document/orgapp-server/message-link-description
    // pc_slide: true-表示在PC客户端侧边栏打开, false-表示在浏览器打开
    return `dingtalk://dingtalkclient/page/link?url=${encodeURIComponent(
      url
    )}&pc_slide=${pc_slide}`;
  }

  sendBase(data, opts) {
    // 消息内容中不包含任何关键词
    // { "errcode":310000, "errmsg":"keywords not in content" }
    // timestamp 无效
    // { "errcode":310000, "errmsg":"invalid timestamp" }
    // 签名不匹配
    // { "errcode":310000, "errmsg":"sign not match" }
    // IP地址不在白名单
    // { "errcode":310000,  "errmsg":"ip X.X.X.X not in whitelist" }
    return new Promise((resolve) => {
      axios
        .post(this._webhookUrl, data, opts)
        .then(function (response) {
          // success { errcode: 0, errmsg: 'ok' }
          if (response.data?.errcode !== 0) {
            console.log(response.data);
          }
          resolve(response.data);
        })
        .catch(function (error) {
          resolve(error);
        });
    });
  }

  sendAt(at, type = "mobile") {
    // [@用户]时的参数统一处理
    // at === true 时，@所有人
    // at === [123,456,789,...number] 时，
    //   1、type === "mobile" number用注册钉钉的电话号码@对应用户
    //   2、type === "user" number用钉钉的用户id@对应用户
    const isArray = Array.isArray(at);
    const isBool = typeof at === "boolean";
    const isMobile = type === "mobile";
    const isUserId = type === "user";
    return {
      atMobiles: isArray && isMobile ? at : [],
      atUserIds: isArray && isUserId ? at : [],
      isAtAll: isBool ? at : false,
    };
  }

  sendText(data) {
    // { errcode: 400202, errmsg: 'miss param : text->content' }
    const { text, at, atType } = data || {};
    return this.sendBase({
      msgtype: "text",
      text: {
        content: text,
      },
      at: this.sendAt(at, atType),
    });
  }

  sendLink(link) {
    // { errcode: 400302, errmsg: 'miss param : link->text' }
    // { errcode: 400303, errmsg: 'miss param : link->title' }
    // { errcode: 400304, errmsg: 'miss param : link->messageUrl' }
    return this.sendBase({
      msgtype: "link",
      link,
    });
  }

  sendMarkdown(data) {
    // { errcode: 400402, errmsg: 'miss param : markdown->title' }
    // { errcode: 400403, errmsg: 'miss param : markdown->text' }
    const { title, text, at, atType } = data || {};
    return this.sendBase({
      msgtype: "markdown",
      markdown: { title, text },
      at: this.sendAt(at, atType),
    });
  }

  sendActionCardSingle(data) {
    // 与sendActionsCard统一按钮参数名{ title, actionURL }
    const { title, text, btn } = data || {};
    const { title: singleTitle, actionURL } = btn || {};
    return this.sendBase({
      msgtype: "actionCard",
      actionCard: {
        title, // 非必传
        text, // { errcode: 400503, errmsg: 'miss param : actionCard->text' } text: markdown类型
        singleTitle, // 非必传
        singleURL: actionURL, // 非必传
        btnOrientation: "0", // 非必传
      },
    });
  }

  sendActionCard(actionCard) {
    // { errcode: 400503, errmsg: 'miss param : actionCard->text' } text: markdown类型
    // btnOrientation: "1", 横向显示时，btns长度必须等于2才有效
    return this.sendBase({
      msgtype: "actionCard",
      actionCard,
    });
  }

  sendFeedCard(links) {
    // { errcode: 400602, errmsg: 'miss param : feedCard->links' }
    return this.sendBase({
      msgtype: "feedCard",
      feedCard: {
        links,
      },
    });
  }
}

module.exports = Robot_DD;
