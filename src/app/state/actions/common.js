import _ from 'lodash'
import * as actions from 'app/actions'
import { models } from '../model/index'
import { put } from 'redux-saga/effects'
import store from '../store'

function* generateMethods(entities, method) {
    for (const key in models) {
        const attr = models[key].getKey()
        if (entities[attr]) {
            const action = actions[_.camelCase(`${method} ${attr}`)]
            if (typeof action === 'function') {
                yield put(action(entities[attr]))
            }
        }
    }
}

const callMethods = (entities, method) =>_.forEach(models, model => {
    const attr = model.getKey()
    if (entities[attr]) {
        const action = actions[_.camelCase(`${method} ${attr}`)]
        if (typeof action === 'function') {
            store.dispatch(action(entities[attr]))
        }
    }
})

function* generateSetEntities(entities) {
    yield* generateMethods(entities, 'set')
}

function* generateClearEntities(entities) {
    yield* generateMethods(entities, 'clear')
}

const setEntities = entities => callMethods(entities, 'set')
const clearEntities = entities => callMethods(entities, 'clear')

export {
    generateSetEntities,
    generateClearEntities,
    setEntities,
    clearEntities
}