var path = require('path'),
    webpack = require('webpack'),
    config = require('./webpack.dev'),
    fs = require('fs-extra'),
    postcss = require('postcss'),
    prefix = require('autoprefixer'),
    sass = require('node-sass'),
    express = require('express'),
    rimraf = require('rimraf')

module.exports = function (server, opts) {

    if (opts.args.bundle) {
        rimraf(opts.output, function () {
            fs.mkdirsSync(opts.output)

            postcss([prefix({browsers: 'last 8 versions'})]).process(sass.renderSync({
                file: opts.scss,
                outputStyle: 'compressed',
                sourceMap: false
            }).css, {
                from: opts.scss,
                to: path.join(opts.output, 'app.css')
            }).then(function (result) {
                fs.writeFileSync(path.join(opts.output, 'app.css'), result.css);
                console.log('scss compiled')
            })

            config = require('./webpack.bundle')(opts)
            webpack(config).run(function (err) {
                console.log('js compiled')
            })

            var copy = function (location) {
                fs.copy(location, `${opts.output}/${location.substring(location.lastIndexOf('/'))}`, {});
            }

            copy(opts.static)
            copy(opts.index)
            opts.copy.forEach(location => {
                copy(location)
            })
        })

        opts.run = false
    } else if (opts.variables.ENVIRONMENT == 'production') {
        server.use('/resources', express.static(`${opts.output}/${opts.static.substring(opts.static.lastIndexOf('/'))}`))

        server.use(`/${opts.fileName}.js`, function (req, res) {
            res.sendFile(`${opts.output}/${opts.fileName}.js`)
        })

        server.use(`/${opts.fileName}.css`, function (req, res) {
            res.sendFile(`${opts.output}/${opts.fileName}.css`)
        })
    } else {
        config = config(opts)
        var compiler = webpack(config)

        server.use(require('webpack-dev-middleware')(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath
        }))

        server.use(require('webpack-hot-middleware')(compiler))
    }
}