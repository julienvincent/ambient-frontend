import { SET_REQUEST } from 'app/actions/common'
import _ from 'lodash'

const requests = (state = {}, action) => {
    const mergeDeep = (request, state) => {
        if (request.length > 1) {
            return {
                ...state,
                [request[0]]: mergeDeep(_.without(request, request[0]), state ? state[request[0]] : {})
            }
        }

        return {
            ...state,
            [request[0]]: action.status
        }
    }

    switch (action.type) {
        case SET_REQUEST:
            return {
                ...state,
                ...mergeDeep(_.split(action.request, '.'), state)
            }
        default:
            return state
    }
}

export { requests as default, requests }