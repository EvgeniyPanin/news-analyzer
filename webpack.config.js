const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const isDev = process.env.NODE_ENV === 'development';


const path = require('path');

module.exports = {
    entry: {
        main: './src/index.js',
        about: './src/about/index.js',
        analytics: './src/analytics/index.js'
 },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
                    test: /\.js$/,
                    use: {loader: 'babel-loader'},
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                            {
                                loader:'css-loader',
                                options: {
                                    importLoaders: 2,
                                }
                            },
                            'postcss-loader']
                },
                {
                    test: /\.(png|jpg|gif|ico|svg)$/,
                    use: [
                            'file-loader?name=./images/[name].[ext]',
                            {
                                    loader: 'image-webpack-loader',
                                    options: {}
                            },
                        ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options: {
                      name: './fonts/[name].[ext]'
                    }
                }
            ]
        },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main']

        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/about/about.html',
            filename: 'about.html',
            chunks: ['about']
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './src/analytics/analytics.html',
            filename: 'analytics.html',
            chunks: ['analytics']
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new WebpackMd5Hash()
    ]
}
