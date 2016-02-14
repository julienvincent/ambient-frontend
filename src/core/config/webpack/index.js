module.exports = function (server, opts) {
    var path = require('path'),
        webpack = require('webpack'),
        config = require('./webpack.dev')

    if (opts.args.build) {
        opts.run = false
    } else if (opts.variables.ENVIRONMENT == 'production') {
        config = require('./webpack.prod')
    }

    var compiler = webpack(config)

    server.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }))

    server.use(require('webpack-hot-middleware')(compiler))
}