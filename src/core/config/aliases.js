var config = require('./main'),
    namespace = function (path) {
        return path ? `${config.namespace}/${path}` : config.namespace
    }

module.exports = {
    [namespace()]: config.root,
    scss: config.scss
}