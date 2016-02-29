const user = {
    type: 'object',
    schemaAttribute: 'users',
    definition: {
        books: ['book']
    },
    properties: {
        firstname: {type: 'string', faker: 'name.firstName'},
        lastname: {type: 'string'}
    },
    required: ['firstname', 'lastname']
}

const book = {
    type: 'object',
    schemaAttribute: 'books',
    definition: {

    },
    properties: {
        author: {type: 'string', faker: 'random.number'}
    },
    required: ['author']
}

export {
    user,
    book
}