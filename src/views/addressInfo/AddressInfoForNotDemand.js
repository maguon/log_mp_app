import AddressInfoEditor from './AddressInfoEditor'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
    const { orderListNotDemandReducer: { data: { orderListNotDemand } } } = state
    const { orderId } = ownProps
    return {
        order: orderListNotDemand.find(item => item.id == orderId)
    }
}

export default connect(mapStateToProps)(AddressInfoEditor)
