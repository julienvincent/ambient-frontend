import { Component } from 'react'
import { div } from 'app/components'
import { connect } from 'app/utils'

@connect(state => ({state}))
export default
class Container extends Component {

    componentWillMount() {
    }

    componentWillReceiveProps() {
        this.forceUpdate()
    }

    render() {
        return (
            div({onClick: () => this.props.actions.users.fetch()}, 'ambient')
        )
    }
}