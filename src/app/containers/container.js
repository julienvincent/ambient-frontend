import { Component, createElement } from 'react'
import { connect } from 'app/utils'

@connect(state => ({state}))
export default
class Container extends Component {
    constructor() {
        super()

        this.state = {
            title: 'ok'
        }
    }

    componentWillReceiveProps(props) {
        this.forceUpdate()
    }

    render() {
        console.log(this.props)
        this.props.actions.users.fetch(['user'])
        const { title } = this.state

        return (
            createElement('div', {onClick: () => this.setState({title: 'lol'}), className: 'awesome'}, title)
        )
    }
}