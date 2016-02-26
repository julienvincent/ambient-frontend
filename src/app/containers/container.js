import { Component, createElement } from 'react'
import { div, DevTools } from 'app/components'
import { connect } from 'app/utils'

@connect()
export default
class Container extends Component {
    constructor() {
        super()

        this.state = {}
    }

    componentWillMount() {
        //this.props.actions.users.fetch()
    }

    componentWillReceiveProps(props) {
        this.forceUpdate()
    }

    render() {
        //console.log(this.props.actions)
        const { title } = this.state

        return (
            div({},
                'works'
            )
        )
    }
}