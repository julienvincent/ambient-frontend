import { render } from 'react-dom'
import { createElement } from 'react'
import { Provider } from 'react-redux'
import router from './router/router'
import store from './state/store'
if (ENV.ENVIRONMENT == 'development') {
    require('./app.scss')
}

window.onload = () => {
    render(createElement(Provider, {store: store}, router), document.getElementById('root'))
}