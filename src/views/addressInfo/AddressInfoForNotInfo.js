import AddressInfoEditor from './AddressInfoEditor'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
    const { orderListNotInfoReducer: { data: { orderListNotInfo } } } = state
    const { orderId } = ownProps
    return {
        order: orderListNotInfo.find(item => item.id == orderId)
    }
}

export default connect(mapStateToProps)(AddressInfoEditor)
