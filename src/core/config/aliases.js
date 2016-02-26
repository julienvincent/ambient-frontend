var config = require('./main'),
    p = require('path'),
    namespace = function (path) {
        return path ? p.join(config.namespace, path) : config.namespace
    },
    root = function(path) {
        return path ? p.join(config.root, path) : config.root
    }

module.exports = {
    scss: config.scss,
    [namespace('actions')]: root('state/actions'),
    [namespace('model')]: root('state/model'),
    [namespace('selectors')]: root('state/utils/selectors'),
    [namespace()]: root()
}