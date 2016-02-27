import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import { el, fact } from 'app/components'

import Container from 'app/containers/container'

const route = fact(Route),
    index = fact(IndexRoute)

const router = el(Router, {history: env.ENVIRONMENT == 'production' ? browserHistory : hashHistory},

    route({path: '/', component: Container},
        index()
    )
)

export default router;
