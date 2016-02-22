import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import { el, fact } from 'app/components'

import Container from 'app/containers/container'

let route = fact(Route),
    index = fact(IndexRoute);

const router = el(Router, {history: ENV.ENVIRONMENT == 'production' ? browserHistory : hashHistory},

    route({path: '/', component: Container})
)

export default router;
