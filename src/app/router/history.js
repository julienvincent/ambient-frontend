import { browserHistory, hashHistory } from 'react-router'

const history = env.ENVIRONMENT == 'production' ? browserHistory : hashHistory

export { history as default, history }