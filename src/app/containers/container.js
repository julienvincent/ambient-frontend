import { Component } from 'react'
import { div } from 'app/components'
import { connect } from 'app/utils'

@connect()
export default
class Container extends Component {

    componentWillMount() {

    }

    componentWillReceiveProps() {
        this.forceUpdate()
    }

    render() {
        return (
            div({}, "Ambient")
        )
    }
}