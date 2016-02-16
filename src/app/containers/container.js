import { Component, createElement } from 'react'

export default
class Container extends Component {
    constructor() {
        super()

        this.state = {
            title: 'ok'
        }
    }

    render() {
        const { title } = this.state

        return (
            createElement('div', {onClick: e => this.setState({title: 'lol'}), className: 'awesome'}, title)
        )
    }
}