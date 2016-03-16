import store from 'app/store'
import _ from 'lodash'

const get = query => _.get(store.getState(), query)

const user = id => get(`entities.users.${id}`)
const users = () => get('entities.users')

export {
    user,
    users
}