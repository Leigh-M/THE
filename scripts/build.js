const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const bundle = () => new Promise((resolve, reject) => {
    webpack(webpackConfig, (error, stats) => {
        if (error || stats.hasErrors()) reject(error, stats.errors);

        console.log(stats.toString({
            colors: true,
            warnings: false,
            modules: false,
            assets: true,
            chunks: false,
            entrypoints: false
        }));

        resolve();
    });
});

bundle();
