import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import htmlTemplate from "rollup-plugin-generate-html-template";
import clear from "rollup-plugin-clear";
import terser from "@rollup/plugin-terser";
import livereload from "rollup-plugin-livereload";
import postcss from "rollup-plugin-postcss";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from 'rollup-plugin-typescript2';
export default {
  input: "src/index.tsx",
  output: {
    file: "./dist/bundle.js",
    format: "es",
  },
  plugins: [
    typescript(),
    postcss({
      extensions: [".css"],
      extract: true,
      modules: true,
    }),
    clear(["dist"]),

    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    nodeResolve({
      extensions: [".mjs", ".js", ".json", ".ts"],
    }),
    babel(),
    terser(),
    resolve(),
    commonjs(),
    serve("dist"),
    livereload(),
    htmlTemplate({
      template: "./src/index.html",
      target: "./dist/index.html",
    }),
  ],
};

// 区分bulid 和 dev 环境
/*
    1、build 只做打包操作 不启动服务
    2、根据NODE_ENV来判断 或者多文件形式（先看分章）  
    3、开发模式可以不使用 terser 压缩代码
    4、配置跨域 serve-proxy
*/