/* eslint-disable no-redeclare */
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import TerserJSPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const devMode = process.env.NODE_ENV !== "production";

export default {
  entry: {
    "zuck.js": "./src/index.ts",
    zuck: "./src/styles/index.css",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".ts", "css"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].min.css",
    }),
  ],
  output: {
    libraryTarget: "global",
    libraryExport: "default",
    globalObject: "this",
    path: `${__dirname}/dist`,
    publicPath: "/",
    filename: (chunkData) => {
      let [name, extension] = chunkData.chunk.name.split(".");
      let suffix = devMode ? "" : ".min";

      if (extension) {
        extension = `.${extension}`;
      } else {
        suffix = "";
        extension = devMode ? ".css.js" : ".css.min.js";
      }

      return `${name}${suffix}${extension}`;
    },
    library: "Zuck",
  },
  optimization: {
    minimize: !devMode,
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin({})],
  },
  devServer: {
    allowedHosts: __dirname,
    static: {
      directory: __dirname,
    },
    host: "127.0.0.1",
    port: 8080,
  },
};
