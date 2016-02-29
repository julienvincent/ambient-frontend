import { render } from 'react-dom'
import { createElement, Component } from 'react'
import { DevTools, div, el } from 'app/components'
import { Provider } from 'react-redux'
import router from './router/router'
import store from './state/store'
if (env.ENVIRONMENT == 'development') {
    require('./app.scss')
}

class Root extends Component {
    render() {
        return (
            div({},
                router,
                env.ENVIRONMENT === 'development' ? DevTools({}) : null
            )
        )
    }
}

window.onload = () => {
    render(el(Provider, {store: store}, el(Root)), document.getElementById('root'))
}