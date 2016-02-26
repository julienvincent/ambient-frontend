import fetch from 'isomorphic-fetch'

const API = (req, opts) => {
    const path = 'http://' + env.API_HOST + ':' + env.API_PORT + (req.startsWith('/') ? '' : '/') + req

    return fetch(path, requestOptions = {
        ...opts, ...{
            headers: {
                ...{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + env.TOKEN
                },
                ...opts.headers || {}
            }
        }
    }).then(response => ({
        response,
        json: response.json()
    })).then(parsed => ({
        response: parsed.response,
        json: parsed.json,
        normalized: parsed.json // normalise this
    }))
}

const graphAPI = params => API('/graphql', {
    method: 'POST',
    body: JSON.stringify({query: params})
})

export {
    API,
    graphAPI
}