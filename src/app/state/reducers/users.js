import { SET_USERS, CLEAR_USERS } from 'app/actions/users'
import _ from 'lodash'

const users = (state = {}, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                ...action.users
            }
        case CLEAR_USERS:
            return {
                ...state,
                ..._.without(state, entities)
            }
        default:
            return state
    }
}

export { users as default, users }