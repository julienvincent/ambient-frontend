import fetch from 'isomorphic-fetch'
import { query as Query, mutation as Mutation } from 'modelizr'

const Fetch = (req, opts) => fetch(`http://${env.API_HOST}:${env.API_PORT}${req.startsWith('/') ? '' : '/'}${req}`, {
    ...opts, ...{
        headers: {
            ...{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.TOKEN}`
            },
            ...opts.headers || {}
        }
    }
})

const API = (path, query) => Fetch(path, {
    method: 'POST',
    body: JSON.stringify({query: query})
})

const query = Query.useApi(API).path('/graphql')
const mutation = Mutation.useApi(API).path('/graphql')

export {
    Fetch,
    API,
    query,
    mutation
}