var path = require('path');
var webpack = require('webpack');
var aliases = require('../aliases')

module.exports = function (opts) {
    return {
        entry: [
            opts.js
        ],
        output: {
            path: opts.output,
            filename: `${opts.fileName}.js`
        },
        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            })
        ],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['babel']
                }
            ]
        },

        resolve: {
            alias: aliases
        }
    }
}