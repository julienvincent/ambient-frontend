import { Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import History from 'app/router/history'
import store from 'app/store'
import routes from 'app/router/routes'
import { el } from 'app/components'

const history = syncHistoryWithStore(History, store, {
    selectLocationState: state => state.router
})
const router = el(Router, {history: history}, ...routes)

export { router as default }