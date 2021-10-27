const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin"); // build performance

const isProduction = process.env.NODE_ENV == "production";

const config = {
    entry: "./src/index.ts",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        hot: true, // battery drain
        static: {
            publicPath: "/",
            watch: {
                poll: 1000,
                ignored: ["node_modules"]
            }
        },
        client: {logging: "error"},
        open: false,
        historyApiFallback: true,
        host: "localhost"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html"
        }),
        new ForkTsCheckerWebpackPlugin(),
        new CopyPlugin({patterns: [{from: "assets", to: "assets"}]}),
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, "dll"),
            manifest: require("./dll/babylon.json")
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            projectReferences: true,
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/i,
                use: ["less-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        plugins: [new TsconfigPathsPlugin()]
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
        config.optimization = {
            minimize: true,
            minimizer: [new TerserPlugin()]
        };
    } else {
        config.mode = "development";
    }
    return config;
};
