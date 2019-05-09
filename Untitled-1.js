/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const webpack = require('webpack');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require('http-proxy-middleware');

const open = require('opn');

const config = require('./webpack/webpack-dev.cfg');

const { devServer: devServerConfig, output } = config;

const app = express();
const compiler = webpack(config);

if (devServerConfig.progress) {
    compiler.apply(new webpack.ProgressPlugin());
}
const target = 'localhost:8080';
app.use(
    proxy(['/api/latest', '/ml', '/dp', '/v2/api-docs'], {
        changeOrigin: true,
        logLevel: 'debug',
        target: `http://${target}`,
        headers: { host: target, origin: `http://${target}` },
        ws: true
    })
);

app.use(
    webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: output.publicPath
    })
);

app.use(webpackHotMiddleware(compiler));

app.listen(devServerConfig.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Project is running at http://localhost:${devServerConfig.port}/\n`);

    if (devServerConfig.open) {
        open(`http://localhost:${devServerConfig.port}`);
    }
});
