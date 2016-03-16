import { connect as base } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'
import _ from 'lodash'
import * as selectors from 'app/selectors'
import * as actions from 'app/actions'

const connect = (mapStateToProps, mapDispatchToProps, mergeProps, options) => {

    const newMapDispatchToProps = dispatch => ({
        actions: _.mapValues(_.pickBy({
                ...actions,
                ...{
                    router: routerActions
                }
            },
            (value, key) => typeof value === 'object' && key !== 'default'),
            group => bindActionCreators(group, dispatch))
    })
    mapDispatchToProps = mapDispatchToProps || newMapDispatchToProps

    const newMergeProps = (stateProps, dispatchProps, ownProps) => ({
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        selectors: {
            ...selectors
        }
    })
    mergeProps = mergeProps || newMergeProps

    return base(mapStateToProps, mapDispatchToProps, mergeProps, options)
}

export { connect as default, connect }