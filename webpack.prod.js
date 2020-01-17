const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
            ],
        }],
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
})