module.exports = {
    entry: {
        main: "./src/index.js"
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|gif|)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "./assets/images"
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[hash].[ext]",
                    outputPath: "./assets/fonts"
                }
            },
            {
                test: /\.(mov|mp4)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[hash].[ext]",
                    publicPath: "./assets/images",
                    outputPath: "./assets/videos"
                }
            }
        ]
    }
};
