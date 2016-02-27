var path = require('path'),
    root = function(dir) {
        return path.join(__dirname, '../../', dir)
    }

module.exports = {

    /**
     * The server port
     */
    "port": 3000,

    /**
     * A namespace to be used within the app
     */
    "namespace": "app",

    /**
     * File locations
     */
    "server": path.join(__dirname, 'webpack/index.js'),
    "static": root('resources'),
    "index": root('index.html'),
    "root": root('app'),
    "js": root('app/app.js'),
    "scss": root('app/app.scss'),

    /**
     * HRM settings
     */
    "reload": true,
    "noInfo": true,
    "quiet": false,

    /**
     * Bundle settings
     */

    // Build directory
    "output": root('build'),
    // Output file name. Do not include extension name.
    "fileName": "app",
    // Files or directories to copy to build directory
    "copy": [
    ],

    /**
     * List of environment variables that get used by the server
     * and get injected into the applications `window` variable
     *
     * env      =>  The name of the environment variable to look for.
     *
     * value    =>  The default value if no environment variable
     *              is found
     */
    variables: {
        "ENVIRONMENT": {env: "NODE_ENV", value: 'development'},
        // Hostname belonging to the API
        "API_HOST": {env: "API_HOST", value: 'docker.local'},
        // Port belonging to the API
        "API_PORT": {env: "API_PORT", value: '8080'},
        // Pre-populate the state from mocks
        "PRE_POPULATE_STATE": {env: "PRE_POPULATE_STATE", value: false},
        // Use mocks instead of real requests
        "MOCK": {env: "MOCK", value: true},
        // Set a delay (in ms) for each mocked request
        "MOCK_DELAY": {env: "MOCK_DELAY", value: 0}
    }
}