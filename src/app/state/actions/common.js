import _ from 'lodash'
import * as actions from 'app/actions'
import * as schemas from '../model/schemas'
import { put } from 'redux-saga/effects'

function* callMethods(entities, method) {
    for (const key in schemas) {
        const attr = schemas[key].schemaAttribute
        if (entities[attr]) {
            const action = actions[_.camelCase(`${method} ${attr}`)]
            if (typeof action === 'function') {
                yield put(action(entities[attr]))
            }
        }
    }
}

function* setEntities(entities) {
    yield* callMethods(entities, 'set')
}

function* clearEntities(entities) {
    yield* callMethods(entities, 'clear')
}

export {
    setEntities,
    clearEntities
}