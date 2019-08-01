import { Actions } from 'react-native-router-flux'

export const cityList = (parent) => {
    if (parent === 'homeBlock') {
        return Actions.cityList
    }
    if (parent === 'orderBlock') {
        return Actions.cityListAtOrderBlock
    }
    if (parent === 'feePriceBlock') {
        return Actions.cityListAtFeePriceBlock
    }
    if (parent === 'routeBlock') {
        return Actions.cityListAtRouteBlock
    }
}

export const routeCityList = (parent) => {
    if (parent === 'homeBlock') {
        return Actions.routeCityList
    }
    if (parent === 'orderBlock') {
        return Actions.routeCityListAtOrderBlock
    }
    if (parent === 'feePriceBlock') {
        return Actions.routeCityListAtFeePriceBlock
    }
}

export const orderRemarkEditor = parent => {
    if (parent === 'homeBlock') {
        return Actions.orderRemarkEditor
    }
    if (parent === 'orderBlock') {
        return Actions.orderRemarkEditorAtOrderBlock
    }
}

//
export const recAddrEditor = parent => {
    if (parent === 'homeBlock') {
        return Actions.recAddrEditorAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.recAddrEditorAtOrderBlock
    }
}


//
export const sendAddrEditor = parent => {
    if (parent === 'homeBlock') {
        return Actions.sendAddrEditorAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.sendAddrEditorAtOrderBlock
    }
}

export const addrEditor = parent => {
    if (parent === 'homeBlock') {
        return Actions.addrEditorAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.addrEditorAtOrderBlock
    }
}

//
export const addressInfo = parent => {
    if (parent === 'homeBlock') {
        return Actions.addressInfoAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.addressInfoAtOrderBlock
    }
}



export const supplierList = parent => {
    if (parent === 'homeBlock') {
        return Actions.supplierListAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.supplierListAtOrderBlock
    }
    if (parent === 'routeBlock') {
        return Actions.supplierListAtRouteBlock
    }
}

export const routeCarList = parent => {
    if (parent === 'homeBlock') {
        return Actions.routeCarListAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.routeCarListAtOrderBlock
    }
    if (parent === 'routeBlock') {
        return Actions.routeCarListAtRouteBlock
    }
}


export const loadTaskInfo = parent => {
    if (parent === 'homeBlock') {
        return Actions.loadTaskInfoAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.loadTaskInfoAtOrderBlock
    }
    if (parent === 'routeBlock') {
        return Actions.loadTaskInfoAtRouteBlock
    }
}

export const carListForRoute = parent => {

    if (parent === 'homeBlock') {
        return Actions.carListForRouteAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.carListForRouteAtOrderBlock
    }
    if (parent === 'routeBlock') {
        return Actions.carListForRouteAtRouteBlock
    }
}

export const createRoute = parent => {
    if (parent === 'homeBlock') {
        return Actions.createRouteAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.createRouteAtOrderBlock
    }
    if (parent === 'routeBlock') {
        return Actions.createRouteAtRouteBlock
    }
}

export const orderCarList = parent => {
    if (parent === 'homeBlock') {
        return Actions.orderCarListAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.orderCarListAtOrderBlock
    }
    if (parent === 'routeBlock') {
        return Actions.orderCarListAtRouteBlock
    }
}

export const addOrderCar = parent => {
    if (parent === 'homeBlock') {
        return Actions.addOrderCarAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.addOrderCarAtOrderBlock
    }
}

export const orderCarEditor = parent => {
    if (parent === 'homeBlock') {
        return Actions.orderCarEditorAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.orderCarEditorAtOrderBlock
    }
}

export const orderCarInfo = parent => {
    if (parent === 'homeBlock') {
        return Actions.orderCarInfoAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.orderCarInfoAtOrderBlock
    }
    if (parent === 'routeBlock') {
        return Actions.orderCarInfoAtRouteBlock
    }
}

export const orderCarFeeEditor = parent => {
    if (parent === 'homeBlock') {
        return Actions.orderCarFeeEditorAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.orderCarFeeEditorAtOrderBlock
    }
}

export const payment = parent => {
    if (parent === 'homeBlock') {
        return Actions.paymentAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.paymentAtOrderBlock
    }
}

export const routeForOrder = parent => {
    if (parent === 'homeBlock') {
        return Actions.routeForOrderAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.routeForOrderAtOrderBlock
    }
    if (parent === 'routeBlock') {
        return Actions.routeForOrderAtRouteBlock
    }
}


export const routeTaskListForOrder = parent => {
    if (parent === 'homeBlock') {
        return Actions.routeTaskListForOrderAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.routeTaskListForOrderAtOrderBlock
    }
    if (parent === 'routeBlock') {
        return Actions.routeTaskListForOrderAtRouteBlock
    }
}

export const pickUpAddrEditor = parent => {
    if (parent === 'homeBlock') {
        return Actions.pickUpAddrEditorAtHomeBlock
    }
    if (parent === 'orderBlock') {
        return Actions.pickUpAddrEditorAtOrderBlock
    }
    if (parent === 'routeBlock') {
        return Actions.pickUpAddrEditorAtRouteBlock
    }

}