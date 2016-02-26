var express = require('express'),
    server = express(),
    args = require('minimist')(process.argv),
    opts = require('./config/main'),
    module = require(opts.server),
    _ = require('lodash'),
    path = require('path'),
    env = require('dotenv').config({path: path.join(__dirname, '../.env'), silent: true}),
    fs = require('fs'),
    cheerio = require('cheerio')

var setEnv = function (val) {
    return process.env[opts.variables.ENVIRONMENT.env] = val
}

if (args.environment) {
    setEnv(args.environment)
}

if (args.production) {
    setEnv('production')
}

if (args.development) {
    setEnv('development')
}

if (args.bundle) {
    setEnv('production')
}

if (args.port) {
    opts.port = args.port
}

opts.variables = _.mapValues(opts.variables, function (variable) {
    return process.env[variable.env] || variable.value
})

opts.args = args

if (opts.static) {
    server.use('/resources', express.static(opts.static))
}
module(server, opts)

server.get('*', function (req, res) {
    var production = opts.variables.ENVIRONMENT == 'production',
        index = production ? fs.readFileSync(`${opts.output}/index.html`, 'utf8') :
            fs.readFileSync(opts.index, 'utf8'),
        injector = cheerio.load(index)

    var js = `<script src="/${opts.fileName}.js"></script>`,
        variables = `<script>window.env = ${JSON.stringify(opts.variables)}</script>`

    if (production) {
        var css = `<link rel="stylesheet" href="/${opts.fileName}.css">`
        injector('head').append(`${css}\n`)
    } else {
        js = `<script src="${opts.js.substring(opts.js.lastIndexOf('/'))}"></script>`
    }

    injector('body').append(`${variables}\n`)
    injector('body').append(`${js}\n`)

    res.send(injector.html())
})

if (opts.run !== false) {
    server.listen(opts.port, function () {
        console.log(`Server listening at http://localhost:${opts.port}/`)
    })
}
