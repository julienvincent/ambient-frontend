import * as actions from 'app/actions'
import * as models from 'app/model/schemas'
import store from 'app/store'
import _ from 'lodash'

const callMethods = (entities, method) => _.forEach(models, model => {
    const attr = model.getKey()
    if (entities[attr]) {
        const action = actions[_.camelCase(`${method} ${attr}`)]
        if (typeof action === 'function') {
            store.dispatch(action(entities[attr]))
        }
    }
})

const setEntities = entities => callMethods(entities, 'set')
const clearEntities = entities => callMethods(entities, 'clear')

export const SET_REQUEST = "SET_REQUEST"
const setRequest = (request, status) => {
    status = status === undefined ? 1 : status
    store.dispatch({
        type: SET_REQUEST,
        request,
        status
    })
}

export { setEntities, clearEntities, setRequest }