const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const stylish = require('eslint/lib/formatters/stylish');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const { publicPaths } = require('./config');

const appTitle = 'Title inserted from Webpack';

const src = path.resolve(__dirname, publicPaths.src) + '/';
const dist = path.join(__dirname, publicPaths.dist) + '/';

const env = process.env.NODE_ENV || 'production';

const sourceMap = 'source-map';

module.exports = {
    entry: {
        entry: src + 'index.js'
    },
    devtool: sourceMap,
    mode: env,
    output: {
        path: dist,
        filename: '[name].' + publicPaths.bundleName
    },

    target: 'web',

    resolve: {
        modules: [path.resolve('node_modules')],
        extensions: ['.json', '.jsx', '.js']
    },

    cache: true,
    stats: {
        children: false
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title: appTitle,
            inject: false,
            filename: dist + 'index.html',
            chunks: ['entry'],
            chunksSortMode: 'manual',
            template: src + 'index.ejs'
        }),
        new HtmlWebpackHarddiskPlugin({
            outputPath: dist
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            formatter: stylish
                        }
                    }
                ]
            }
        ]
    }
};
