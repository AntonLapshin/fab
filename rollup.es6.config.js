import resolve from "rollup-plugin-node-resolve";
import scss from "rollup-plugin-scss";

export default {
  entry: "src/index.js",
  format: "umd",
  moduleName: "fab",
  plugins: [
    resolve(),
    scss({
      output: "bin/fab.css"
    })
  ],
  dest: "bin/fab.es6.js"
};
