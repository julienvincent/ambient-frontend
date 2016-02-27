import { take, put, call, fork } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
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
    payload: users
})

const UPDATE_USER = 'UPDATE_USER'
const update = user => ({
    type: UPDATE_USER,
    payload: users
})

const users = {
    fetch,
    store,
    update
}

/**
 * User sagas
 */

function* watchFetchUsers(users) {
    while (true) {
        const action = yield take(FETCH_USERS)
        const response = yield call(
            API,
            {
                users: {
                    model: 'user'
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