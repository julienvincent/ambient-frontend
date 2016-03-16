import { Route, IndexRoute } from 'react-router'
import { fact } from 'app/components'
const route = fact(Route),
    index = fact(IndexRoute)

/**
 * Components
 */
import Container from 'app/containers/container'

/**
 * Routes
 */
const routes = [
    route({path: '/', component: Container},
        index({component: Container})
    ),

    route({path: '/lol', component: Container})
]

export { routes as default, routes }