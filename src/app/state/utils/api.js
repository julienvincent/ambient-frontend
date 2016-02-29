import fetch from 'isomorphic-fetch'
import { buildRequest } from 'app/model'
import { setEntities } from 'app/actions/common'

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

const API = (request, auto, mockError) => {
    const util = buildRequest(request)

    const getRequest = () => {
        if (env.MOCK) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (mockError) {
                        reject(new Error('Mocked error'))
                    } else {
                        resolve({
                            json: () => util.mock()
                        })
                    }
                }, env.MOCK_DELAY || 0)
            })
        } else {
            return Fetch('/graphql', {
                method: 'POST',
                body: JSON.stringify({query: util.getQuery()})
            })
        }
    }

    return getRequest().then(response => ({
        response,
        json: response.json(),
        normalized: util.normalize(response.json())
    })).then(response => {
        if (auto) {
            setEntities(response.normalized.entites)
        }

        return response
    })
}

export {
    Fetch,
    API
}