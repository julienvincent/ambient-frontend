import { SET_USERS, CLEAR_USERS } from 'app/actions/users'
import { setEntities, clearEntities } from './common'

export const users = (state = {}, action) => {
    switch (action.type) {
        case SET_USERS:
            return setEntities(state, action.users)
        case CLEAR_USERS:
            return clearEntities(state, action.users)
        default:
            return state
    }
}

export { users as default }