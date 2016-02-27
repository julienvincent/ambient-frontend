import { take, call, fork } from 'redux-saga/effects'
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

const FETCH_USERS = 'FETCH_USERS'
const fetch = users => ({
    type: FETCH_USERS,
    payload: users
})

const STORE_USER = 'STORE_USER'
const store = user => ({
    type: STORE_USER,
    payload: user
})

const UPDATE_USER = 'UPDATE_USER'
const update = user => ({
    type: UPDATE_USER,
    payload: user
})

const users = {
    fetch,
    store,
    update
}

/**
 * User sagas
 */

function* watchFetchUsers() {
    while (true) {
        const action = yield take(FETCH_USERS)
        const response = yield call(
            API,
            {
                users: {
                    model: 'user',
                    take: action.payload
                }
            }
        )
        yield call(setEntities, response.normalized.entities)
    }
}

function* saga() {
    yield [
        fork(watchFetchUsers)
    ]
}

export { saga as default, users }