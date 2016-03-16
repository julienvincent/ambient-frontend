import { schema } from 'modelizr'

const user = schema('users', {
    firstName: {type: 'string', faker: 'name.firstName'},
    lastName: {type: 'string', faker: 'name.lastName'},
    age: {type: 'integer', faker: 'random.number'}
})
const book = schema('books', {
    title: {type: 'string', faker: 'name.firstName'},
    publisher: {type: 'string'}
})

//user.define({
//    books: [book],
//    bestSeller: book
//})
book.define({
    author: user
})

export { user, book }