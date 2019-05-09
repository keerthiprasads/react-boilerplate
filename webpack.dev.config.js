const webpack = require('webpack');
const merge = require('webpack-merge');

const webpackCommon = require('./webpack.config');

module.exports = merge(webpackCommon, {
    devtool: 'eval-source-map',
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
});
