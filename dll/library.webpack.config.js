const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "production",
    context: path.resolve(__dirname, "../"),
    resolve: {
        extensions: [".js", ".jsx", ".json", ".less", ".css"],
        modules: [path.resolve(__dirname, "../node_modules")]
    },

    entry: {
        babylon: ["@babylonjs/core", "@babylonjs/materials", "fpsmeter"]
    },
    output: {
        filename: "[name].dll.js",
        path: path.resolve(__dirname),
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            name: "[name]",
            path: path.resolve(__dirname, "[name].json")
        })
    ]
};
