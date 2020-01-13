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
        }]
    }
}