const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js'],
        mainFields: ['main'],
        modules: [
            path.resolve(__dirname, 'node_modules')
        ]
    },
    externals: {
        'aws-sdk': 'aws-sdk'
    },
    stats: {
        warningsFilter: 'Critical dependency: the request of a dependency is an expression'
    },
    optimization: {
        minimize: false
    },
    target: 'node',
    devtool: 'eval',
    mode: 'development',
    entry: {
        getSwaggerDoc: './handlers/getSwaggerDoc/index.js',
        getUniversityData: './handlers/getUniversityData/index.js',
        putUniversity: './handlers/putUniversity/index.js',
        putSubmission: './handlers/putSubmission/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/index.js',
        libraryTarget: 'commonjs'
    }
};
