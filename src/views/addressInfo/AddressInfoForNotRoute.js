import AddressInfo from './AddressInfo'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
    const { orderListNotRouteReducer: { data: { orderListNotRoute } } } = state
    const { orderId } = ownProps
    return {
        order: orderListNotRoute.find(item => item.id == orderId)
    }
}

export default connect(mapStateToProps)(AddressInfo)