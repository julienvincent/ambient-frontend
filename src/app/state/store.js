import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'
import initialState from 'app/model'
import DevTools from 'app/components/DevTools'

const middleware = applyMiddleware(thunk)
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

const store = env.ENVIRONMENT == 'production' ? prodStore() : devStore()

export { store as default }