import { API } from '../utils/api'
import { setEntities } from './common'

/**
 * State manipulators
 */

export const SET_USERS = "SET_USERS"
export const setUsers = users => ({
    type: SET_USERS,
    users
})

export const CLEAR_USERS = "CLEAR_USERS"
export const clearUsers = users => ({
    type: CLEAR_USERS,
    users
})

/**
 * Methods parsed in as props
 */

const fetch = users => dispatch => {
    API({
        users: {
            model: 'user',
            params: {
                ids: users
            },
            books: {
                model: 'book',
                params: {
                    ids: [1, 2, 3, 4]
                }
            }
        }
    }).then(response => setEntities(response.normalized.entities))
        .catch(err => console.log(err))
}

const store = user => dispatch => {

}

const update = user => dispatch => {

}

const users = {
    fetch,
    store,
    update
}

export { users }