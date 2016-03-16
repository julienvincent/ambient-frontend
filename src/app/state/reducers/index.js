import { combineReducers } from 'app/utils'
import { routerReducer } from 'react-router-redux'
import users from './users'
import requests from './requests'

export default combineReducers({
    entities: {
        users
    },
    router: routerReducer,
    requests
})