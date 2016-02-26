import _ from 'lodash'

export const setEntities = (state, entities) => ({
    ...state,
    ...entities
})

export const clearEntities = (state, entities) => ({
    ...state,
    ..._.without(state, entities)
})