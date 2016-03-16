import { query, mutation } from '../utils/api'
import { book, user } from 'app/model/schemas'
import { setEntities, setRequest } from './common'

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
const fetch = users => () => {
    setRequest('users.fetch')

    query(
        user(
            book()
        ).params({id: users})
    ).mock().debug()
        .normalize(res => setEntities(res.entities))
        .then(() => setRequest('users.fetch', 0))
        .catch()
}

const store = newUser => () => {
    mutation(
        user({...newUser}).as('setUser')
    ).catch()
}
const update = id => () => {
    mutation(
        user({id}).as('updateUser')
    ).catch()
}

const users = {
    fetch,
    store,
    update
}

export { users }