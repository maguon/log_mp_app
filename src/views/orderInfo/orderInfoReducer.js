import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        order: {}
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)

}


export default handleActions({

    [reduxActionTypes.orderInfo.set_orderInfo]: (state, action) => {
        const { payload: { order } } = action
        console.log('action',action)
        console.log('order',order)
        return {
            ...state,
            data:{
                ...state.data,
                order
            }
        }
    }


}, initialState)