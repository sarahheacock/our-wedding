const path = require("path");

module.exports = {
    // mode: "production",
    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
        path: path.resolve(__dirname, "../server/static"),
        filename: "index.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [{
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader"
            }]
        }, {
            test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
        }]
    }
}