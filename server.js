const express = require('express');
const webpack = require('webpack');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./serverConfig');
const { devServer: devServerConfig, output } = config;

const app = express();
const compiler = webpack(config);
if (devServerConfig.progress) {
    compiler.apply(new webpack.ProgressPlugin());
}

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

    /* if (devServerConfig.open) {
      open(`http://localhost:${devServerConfig.port}`);
    } */
});

app.use(express.static('dist'));

/* app.get(['/'], (req, res) => {
    serverRender(req.params.contestId)
        .then(content => {
            console.log(content);

            res.render('index', {
                ...content
            });
        })
        .catch(console.error);
}); */
