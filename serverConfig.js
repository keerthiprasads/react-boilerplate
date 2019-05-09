const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const webpackDev = require('./webpack.dev.config');
const { publicPaths } = require('./config');

module.exports = merge(webpackDev, {
    entry: {
        hot: 'webpack-hot-middleware/client?reload=true&overlay=true',
        publicPath: path.resolve(__dirname, publicPaths.dist)
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: [/node_modules/]
        })
    ],
    output: {
        filename: '[name].' + publicPaths.bundleName,
        chunkFilename: '[name].' + publicPaths.bundleName
    },

    devServer: {
        open: true,
        port: 3000,
        progress: true
    }
});
