import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'
import * as reduxActions from '../../reduxActions'


class InitView extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.waiting()
    }

    render() {
        const { initViewReducer: { initApp: { step } } } = this.props
        console.log('step', step)
        console.log('this.props.initViewReducer', this.props.initViewReducer)
        return (
            <View>
                <Text>InitView</Text>
            </View>
        )
    }
}
// const InitView = props => {

// }


const mapStateToProps = (state) => {
    return {
        initViewReducer: state.initViewReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    waiting: () => {
        dispatch(reduxActions.initView.waiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(InitView)

