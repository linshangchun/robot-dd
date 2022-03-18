```
***----install----***
npm install robot-dd

***----实例化----***
const Robot_DD = require("robot-dd");
# secret 可选，根据钉钉机器人配置而来
const robotDD = new Robot_DD({
  access_token:
    "XXXXXX",
  secret:
    "XXXXXX",
});

***----Robot_DD.newUrl(url, pc_slide = false)----***
类静态方法Robot_DD.newUrl格式化处理外部链接
使用场景：消息链接在PC端侧边栏或外部浏览器打开
pc_slide: true-表示在PC客户端侧边栏打开, false-表示在浏览器打开
详情阅见：https://open.dingtalk.com/document/orgapp-server/message-link-description

***----text----***
robotDD.sendText({
  text: `time: ${Date.now()}\n 公网包测试钉钉机器人消息发送`,
  at: ["150xxxxxx"], or true
});

***----link----***
robotDD.sendLink({
  text: "测试钉钉机器人【链接】消息,链接前必须带协议前缀【如：https://www.baidu.com】",
  title: "点击打开百度浏览器",
  messageUrl: "https://open.dingtalk.com/document/group/custom-robot-access",
  picUrl:
    "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png",
});

***----markdown----***
robotDD.sendMarkdown({
  title: "测试钉钉机器人【markdown】消息",
  text: "#### 杭州天气 @150xxxxxx \n > 9度，西北风1级，空气良89，相对温度73%\n > ![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png)\n > ###### 10点20分发布 [天气](https://open.dingtalk.com/document/group/custom-robot-access) \n",
  at: true,
});

***----actionCard-single----***
robotDD.sendActionCardSingle({
  title: "钉钉机器人【actionCardSingle】消息",
  text: `![screenshot](https://gw.alicdn.com/tfs/TB1ut3xxbsrBKNjSZFpXXcXhFXa-846-786.png) \n\n
    ## 测试【actionCard-整体跳转类型】消息 \n\n markdown格式的消息，markdown格式的消息,markdown格式的消息`,
  btn: {
    title: "阅读全文",
    actionURL: Robot_DD.newUrl(
      "https://open.dingtalk.com/document/group/custom-robot-access/"
    ),
  },
});

***----actionCard----***
robotDD.sendActionCard({
  title: "钉钉机器人【actionCard】消息",
  text: "![screenshot](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/5099076061/p131218.png) \n\n #### ## 测试【actionCard-独立跳转类型】消息 \n\n markdown格式的消息，markdown格式的消息,markdown格式的消息",
  btnOrientation: "1",
  btns: [
    {
      title: "考勤打开",
      actionURL: "https://www.dingtalk.com/",
    },
    {
      title: "办公问题",
      actionURL: "https://www.dingtalk.com/",
    },
    {
      title: "了解更多",
      actionURL: "https://www.dingtalk.com/",
    },
  ],
});

***----feedCard----***
robotDD.sendFeedCard([
  {
    title: "钉钉机器人【feedCard】消息1",
    messageURL: "https://www.dingtalk.com/",
    picURL:
      "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png",
  },
  {
    title: "钉钉机器人【feedCard】消息2",
    messageURL: "https://www.dingtalk.com/",
    picURL:
      "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png",
  },
  {
    title:
      "钉钉机器人【feedCard】消息3长标题长标题长标题长标题长标题长标题长标题长标题长标题长标题",
    messageURL: "https://www.dingtalk.com/",
    picURL:
      "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png",
  },
  {
    title: "钉钉机器人【feedCard】消息4中标题中标题中标题中标题中标题",
    messageURL: "https://www.dingtalk.com/",
    picURL:
      "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png",
  },
]);

// 更多使用详情阅见：https://open.dingtalk.com/document/group/custom-robot-access
```
