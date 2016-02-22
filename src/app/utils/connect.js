import { connect as base } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import * as actions from 'app/actions'

export const connect = (mapStateToProps, mapDispatchToProps, mergeProps, options) => {

    const newMapDispatchToProps = dispatch => ({
        actions: _.mapValues(_.pickBy(actions,
            value => typeof value === 'object'),
            group => bindActionCreators(group, dispatch))
    })
    mapDispatchToProps = mapDispatchToProps || newMapDispatchToProps

    return base(mapStateToProps, mapDispatchToProps, mergeProps, options)
}

export { connect as default }