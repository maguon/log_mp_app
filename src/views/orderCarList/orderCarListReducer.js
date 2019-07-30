import { handleActions } from 'redux-actions'
import * as reduxActionTypes from '../../reduxActionTypes'

const initialState = {
    data: {
        orderCarList: []
    },
    //login.isResultStatus : 0(未执行), 1(等待), 2(执行成功), 3(未知错误), 4(执行失败)
    getOrderCarList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getOrderCarById: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getOrderCarByCarId: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    delOrderCar: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    getOrderCarByCarIdAddList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [reduxActionTypes.orderCarList.get_orderCarList_success]: (state, action) => {
        const { payload: { orderCarList } } = action
        return {
            ...state,
            data: {
                orderCarList
            },
            getOrderCarList: {
                ...state.getOrderCarList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderCarList.get_orderCarList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderCarList: {
                ...state.getOrderCarList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderCarList.get_orderCarList_waiting]: (state, action) => {
        return {
            ...state,
            getOrderCarList: {
                ...state.getOrderCarList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderCarList.get_orderCarList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderCarList: {
                ...state.getOrderCarList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [reduxActionTypes.orderCarList.get_orderCarById_success]: (state, action) => {
        const { payload: { orderCar } } = action
        return {
            ...state,
            data: {
                ...state.data,
                orderCarList: state.data.orderCarList.map(item => {
                    if (item.id == orderCar.id) {
                        return orderCar
                    } else {
                        return item
                    }
                })
            },
            getOrderCarById: {
                ...state.getOrderCarById,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderCarList.get_orderCarById_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderCarById: {
                ...state.getOrderCarById,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderCarList.get_orderCarById_waiting]: (state, action) => {
        return {
            ...state,
            getOrderCarById: {
                ...state.getOrderCarById,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderCarList.get_orderCarById_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderCarById: {
                ...state.getOrderCarById,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [reduxActionTypes.orderCarList.get_orderCarByCarId_success]: (state, action) => {
        const { payload: { orderCar } } = action
        return {
            ...state,
            data: {
                ...state.data,
                orderCarList: state.data.orderCarList.map(item => {
                    if (item.id == orderCar.id) {
                        return orderCar
                    } else {
                        return item
                    }
                })
            },
            getOrderCarByCarId: {
                ...state.getOrderCarByCarId,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderCarList.get_orderCarByCarId_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderCarByCarId: {
                ...state.getOrderCarByCarId,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderCarList.get_orderCarByCarId_waiting]: (state, action) => {
        return {
            ...state,
            getOrderCarByCarId: {
                ...state.getOrderCarByCarId,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderCarList.get_orderCarByCarId_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderCarByCarId: {
                ...state.getOrderCarByCarId,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [reduxActionTypes.orderCarList.del_orderCar_success]: (state, action) => {
        const { payload: { orderItemId } } = action
        return {
            ...state,
            data: {
                orderCarList: state.data.orderCarList.filter(item => item.id != orderItemId)
            },
            delOrderCar: {
                ...state.delOrderCar,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderCarList.del_orderCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            delOrderCar: {
                ...state.delOrderCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderCarList.del_orderCar_waiting]: (state, action) => {
        return {
            ...state,
            delOrderCar: {
                ...state.delOrderCar,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderCarList.del_orderCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            delOrderCar: {
                ...state.delOrderCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },




    [reduxActionTypes.orderCarList.get_orderCarByCarIdAddList_success]: (state, action) => {
        const { payload: { orderCar } } = action
        console.log('orderCar',orderCar)
        return {
            ...state,
            data: {
                ...state.data,
                orderCarList: [...state.data.orderCarList, orderCar]
            },
            getOrderCarByCarIdAddList: {
                ...state.getOrderCarByCarIdAddList,
                isResultStatus: 2
            }
        }
    },
    [reduxActionTypes.orderCarList.get_orderCarByCarIdAddList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getOrderCarByCarIdAddList: {
                ...state.getOrderCarByCarIdAddList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [reduxActionTypes.orderCarList.get_orderCarByCarIdAddList_waiting]: (state, action) => {
        return {
            ...state,
            getOrderCarByCarIdAddList: {
                ...state.getOrderCarByCarIdAddList,
                isResultStatus: 1
            }
        }
    },
    [reduxActionTypes.orderCarList.get_orderCarByCarIdAddList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getOrderCarByCarIdAddList: {
                ...state.getOrderCarByCarIdAddList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)