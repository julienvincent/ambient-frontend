var path = require('path')

module.exports = {

    /**
     * The server port
     */
    "port": 3000,

    /**
     * The location of the server to use
     */
    "server": path.join(__dirname, 'config/webpack/index.js'),

    /**
     * List of environment variables that get used by the server
     * and get injected into the applications `window` variable
     *
     * env      =>  The name of the environment variable to look for.
     *
     * value    =>  The default value if no environment variable
     *              is found
     */
    "ENVIRONMENT": {env: "NODE_ENV", value: 'development'},
    // Hostname belonging to the API
    "API_HOST": {env: "API_HOST", value: 'docker.local'},
    // Port belonging to the API
    "API_PORT": {env: "API_PORT", value: '8080'}
}