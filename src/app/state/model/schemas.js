const user = {
    type: 'object',
    schemaAttribute: 'users',
    definition: {
        books: ['book']
    },
    properties: {
        firstname: {type: 'string'},
        lastname: {type: 'string'}
    },
    required: ['firstname', 'lastname']
}

const book = {
    type: 'object',
    schemaAttribute: 'books',
    definition: {
        author: 'user'
    },
    properties: {
        author: {type: 'string'}
    },
    required: ['author']
}

export {
    user,
    book
}