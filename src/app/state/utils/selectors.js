import store from '../store'
import _ from 'lodash'

const get = query => _.result(store.getState(), query)

const user = id => get(`entities.users.${id}`)
const users = () => get('entities.users')

export {
    user,
    users
}