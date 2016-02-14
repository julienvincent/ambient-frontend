var express = require('express'),
    server = express(),
    args = require('minimist')(process.argv),
    opts = require('./config/main'),
    module = require(opts.server),
    _ = require('lodash'),
    path = require('path'),
    env = require('dotenv').config({path: path.join(__dirname, '../.env'), silent: true})

opts.variables = _.mapValues(opts.variables, function (variable) {
    return process.env[variable.env] || variable.value
})
opts.args = args

if (opts.static) {
    server.use('/resources', express.static(opts.static))
}
module(server, opts)

server.use('*', function (req, res) {
    res.sendFile(opts.index || path.join(__dirname, '../index.html'))
})

if (opts.run !== false) {
    server.listen(opts.port, function () {
        console.log(`Server listening at http://localhost:${opts.port}/`)
    })
}
