var path = require('path')

module.exports = {

    /**
     * The server port
     */
    "port": 3000,

    /**
     * File locations
     */
    "server": path.join(__dirname, 'webpack/index.js'),
    "static": path.join(__dirname, '../../resources'),
    "index": path.join(__dirname, '../../index.html'),
    "entry": path.join(__dirname, '../../app'),
    "output": path.join(__dirname, '../../build'),

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
        "API_PORT": {env: "API_PORT", value: '8080'}
    }
}