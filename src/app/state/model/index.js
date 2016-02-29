import { Schema, normalize, arrayOf } from 'normalizr'
import jsf from 'json-schema-faker'
import _ from 'lodash'
import * as schemas from './schemas'
import initialState from './InitialState'

Schema.prototype.mockable = function (schema) {
    this.schema = schema
}

Schema.prototype.mock = function (ids) {
    if (!ids) return jsf(this.schema)
    if (typeof ids === 'number') return _.set(jsf(this.schema), 'id', ids)
    if (Array.isArray(ids)) return _.map(ids, id => _.set(jsf(this.schema), 'id', id))
}

const models = {}
_.forIn(schemas, (schema, key) => {
    if (!models[key]) {
        models[key] = new Schema(schema.schemaAttribute || key)
    }

    models[key].mockable(schema)
    models[key].define(_.mapValues(schema.definition, definition => {
            const getOrCreate = definition => {
                if (!models[definition]) {
                    const schema = _.find(schemas, (schema, key) => key == definition)
                    if (schema) {
                        models[definition] = new Schema(schema.schemaAttribute || key)
                    } else {
                        throw new Error(`The schema definition ${definition} doesn't exist`)
                    }
                }

                return models[definition]
            }

            if (Array.isArray(definition)) {
                return arrayOf(getOrCreate(definition[0]))
            }
            return getOrCreate(definition)
        })
    )
})

const buildRequest = query => ({
    getQuery: () => {
        let builtQuery = ``

        _.forIn(query, (entity, key) => {
            const makeParams = params => {
                const getType = param => {
                    if (Array.isArray(param)) {
                        return `[${param}]`
                    } else {
                        return `"${param}"`
                    }
                }

                return _.map(params, (param, key) => `${key}: ${getType(param)}`)
            }

            const makeQuery = (entity, key) => {
                const entities = _.omit(entity, ['model', 'type', 'params', 'properties'])

                return `${key}(${makeParams(entity.params)}) { ` +
                    `${entity.properties || []}${_.isEmpty(entities) ? '' : ', '}${_.map(entities, makeQuery)} }`
            }

            if (entity.type == 'mutation') {
                builtQuery += `mutation ${key} { ${key}(${makeParams(entity.properties)}) }`
            } else {
                builtQuery += `{ ${makeQuery(entity, key)} }`
            }
        })

        return builtQuery
    },

    mock: () => {
        const mockNestedRequest = (entity, id) => {
            const models = _.pickBy(entity, child => child && child.model)

            const getNewId = length => (id && typeof id === 'number' ? (id * length - length) : 0)

            if (entity.params) {
                const requestedIds = entity.params.id || entity.params.ids
                if (requestedIds) {
                    if (Array.isArray(requestedIds)) {
                        id = _.map(requestedIds, requestedId => requestedId + getNewId(requestedIds.length))
                    } else {
                        id = requestedIds + (id || 0)
                    }
                } else {
                    id = undefined
                }
            } else {
                id = _.map(_.range(1, 21), requestedId => requestedId + getNewId(20))
            }

            const mockedEntity = mock(entity.model, id)

            if (Array.isArray(mockedEntity)) {
                return _.map(mockedEntity, entity => ({
                    ...entity,
                    ..._.mapValues(models, model => mockNestedRequest(model, entity.id))
                }))
            } else {
                return {
                    ...mockedEntity,
                    ..._.mapValues(models, model => mockNestedRequest(model, mockedEntity.id))
                }
            }
        }

        return {
            ..._.mapValues(query, mockNestedRequest)
        }
    },

    normalize: response => normalize(response, _.mapValues(query, (entity, key) => {
        if (Array.isArray(response[key])) {
            return arrayOf(models[entity.model])
        } else {
            return models[entity.model]
        }
    }))
})

const mock = (entity, ids = _.range(1, 21)) => {
    if (typeof entity === 'string') {
        return models[entity].mock(ids)
    } else {
        return entity.mock(ids)
    }
}

const mockAll = (initialState, ids) => ({
    ...initialState.entities,
    ..._.mapValues(_.mapKeys(models, definition => definition.getKey()), entity => mock(entity, ids))
})

if (env.PRE_POPULATE_STATE) {
    initialState.entities = mockAll(initialState, _.range(0, 21))
}

export {
    initialState as default,
    initialState,
    models,
    mock,
    mockAll,
    buildRequest
}