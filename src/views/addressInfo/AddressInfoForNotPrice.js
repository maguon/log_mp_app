import AddressInfoEditor from './AddressInfoEditor'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
    const { orderListNotPriceReducer: { data: { orderListNotPrice } } } = state
    const { orderId } = ownProps
    return {
        order: orderListNotPrice.find(item => item.id == orderId)
    }
}

export default connect(mapStateToProps)(AddressInfoEditor)