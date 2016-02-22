# Todo

+ Server Rendering in production
+ Data flow
+ redux-router
+ circleci intergration
+ Docker setup
+ cluster deployment
+ Small app proxy deployment

# server

All server components and config is located at `src/core`. There are two main config points:

### `config/main.js`
all file locations are specified here as well as runtime options.

```javascript
{

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
        "API_PORT": {env: "API_PORT", value: '8080'}
    }
}
```

The server is defaulted to use webpack, but if you want to use a different server set up, then it is easy to swap out. The server should
pull in config from `main.js`, map aliases correctly according to `aliases.js` and inject the environment variables from `main.js` into 
the application as `window.ENV`.
 
### `config/aliases.js`

this is a config to set up file and directory mappings. Maps module => file/directory

```javascript
{
    scss: config.scss,
    [namespace('actions')]: root('state/actions'),
    [namespace()]: root()
}
```


# actions

To inject bound actions into react components, wrap the component in the `@connect` decorator found at `app/utils`. This decorator is an extention of
[react-redux]()'s connect method and works the same. You actions need to export a named object containing all the actions you want available through
the connect decorator. Actions will be namespaced as under `actions`. eg:

```javascript
/* -- users.js (actions) -- */

export const SET_USERS = "SET_USERS"
export const setUsers = users => ({
    type: SET_USERS,
    users
})

const fetch = () => dispatch => {
	// fetch users and dispatch setUsers
}

/**
 * actions being bound to store and injected as props
 */
export const users = {
	fetch
}
```

```javascript
/* -- MyComponent.js (react component) -- */

import { Component } from 'react'
import { connect } from 'app/utils`

@connect(state => ({users: state.entities.users}))
export default
class MyComponent extends Component {
	render() {
		console.log(this.props.actions) // {users: {fetch: function(){}}}
		
		return ...
	}
}
```