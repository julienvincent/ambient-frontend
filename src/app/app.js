import { render } from 'react-dom'
import { createElement } from 'react'
import container from './containers/container'
if (ENV.ENVIRONMENT == 'development') {
    require('./app.scss')
}

window.onload = () => {
    render(createElement(container), document.getElementById('root'))
}