const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NodemonPlugin = require( 'nodemon-webpack-plugin' );

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
        contentBase: path.join(__dirname, 'src')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                loaders: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        }),
        new NodemonPlugin({
            args: ['demo'],
            watch: path.resolve('./public') && path.resolve('./server'),
            verbose: true,
            nodeArgs: [ '--inspect' ],
            script: './server/index.js',
            ext: 'js,njk,json'
        })
    ]
};