import { render } from 'react-dom'
import { createElement, Component } from 'react'
import { DevTools, div } from 'app/components'
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
                createElement(Provider, {store: store}, router),
                env.ENVIRONMENT === 'development' ? DevTools({store: store}) : null
            )
        )
    }
}

window.onload = () => {
    render(createElement(Root), document.getElementById('root'))
}