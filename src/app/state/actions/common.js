import * as actions from 'app/actions'

const setEntities = entities => {
    if (entities.users) {
        actions.setUsers(users)
    }
}

const clearEntities = entities => {
    if (entities.users) {
        actions.clearUsers(users)
    }
}

export {
    setEntities,
    clearEntities
}