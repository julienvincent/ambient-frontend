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
    if (Array.isArray(ids)) return _.keyBy(ids.map(id => _.set(jsf(this.schema), 'id', id)), entity => entity.id)
}

const definitions = {}
_.forIn(schemas, (schema, key) => {
    if (!definitions[key]) {
        definitions[key] = new Schema(schema.schemaAttribute || key)
    }

    definitions[key].mockable(schema)
    definitions[key].define(_.mapValues(schema.definition, definition => {
            const getOrCreate = definition => {
                if (!definitions[definition]) {
                    const schema = _.find(schemas, (schema, key) => key == definition)
                    if (schema) {
                        definitions[definition] = new Schema(schema.schemaAttribute || key)
                    } else {
                        throw new Error(`The schema definition ${definition} doesn't exist`)
                    }
                }

                return definitions[definition]
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

    mock: () => ({
        entities: {
            ..._.mapValues(query, entity => mock(entity.model))
        }
    }),

    normalize: response => normalize(response, _.mapValues(query, entity => arrayOf(definitions[entity.model])))
})

const mock = (entity, repeat = 20) => {
    const range = _.range(1, repeat + 1)
    if (typeof entity === 'string') {
        return definitions[entity].mock(range)
    } else {
        return entity.mock(range)
    }
}

const mockAll = (initialState, repeat) => ({
    ...initialState.entities,
    ..._.mapValues(_.mapKeys(definitions, definition => definition.getKey()), entity => mock(entity, repeat))
})

if (env.PRE_POPULATE_STATE) {
    initialState.entities = mockAll(initialState, 20)
}

export {
    initialState as default,
    initialState,
    definitions,
    mock,
    mockAll,
    buildRequest
}