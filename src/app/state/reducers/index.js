import { combineReducers } from 'app/utils'
import users from './users'

export default combineReducers({
    entities: {
        users
    }
})