const path = require("path");

const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader",
            ],
        }],
    },
    devServer: {
        contentBase: path.resolve(__dirname, "../server/static"),
        port: 9000,
        historyApiFallback: {
            index: "index.html",
            historyApiFallback: {
                index: 'index.html'
            }
        }
    }
})