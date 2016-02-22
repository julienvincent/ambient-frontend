import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import requestsMiddleware from './middleware/requests-middleware'
import normalizeMiddleware from './middleware/normalize-middleware'
import reducers from './reducers/index'

const store = createStore(reducers, applyMiddleware(thunk/*, requestsMiddleware, normalizeMiddleware*/))
export default store