import babel from "rollup-plugin-babel";
import cleanup from "rollup-plugin-cleanup"; // 清除注释
import { terser } from "rollup-plugin-terser"; // 压缩代码

export default ["src/index.js"].map((item) => {
  // 批量打包文件
  return {
    input: item,
    output: {
      file: item.replace("src/", "dist/"),
      format: "cjs",
    },
    watch: true,
    plugins: [
      babel({
        exclude: "node_modules/**",
      }),
      cleanup(),
      terser(),
    ],
  };
});
