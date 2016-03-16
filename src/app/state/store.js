import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'
import initialState from 'app/model/initialState'
import DevTools from 'app/components/DevTools'
import { history } from 'app/router/history'

const middleware = applyMiddleware(thunk, routerMiddleware(history))
const devStore = () => {
    const store = createStore(
        reducers,
        initialState,
        compose(
            middleware,
            DevTools.instrument()
        )
    )

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
const prodStore = () => createStore(reducers, initialState, middleware)

const composeStore = env.ENVIRONMENT == 'production' ? prodStore : devStore

const store = composeStore()

export { store as default, store, composeStore }