import { createStore, applyMiddleware, compose } from 'redux'
import createSagas from 'redux-saga'
import sagas from 'app/actions'
import reducers from './reducers/index'
import initialState from 'app/model'

const middleware = applyMiddleware(createSagas(...sagas))
const devStore = () => {
    const store = createStore(
        reducers,
        initialState,
        compose(
            middleware,
            require('app/components/DevTools').default.instrument()
        )
    )

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/index')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
const prodStore = () => createStore(reducers, initialState, middleware)

const store = env.ENVIRONMENT == 'production' ? prodStore() : devStore()

export { store as default }