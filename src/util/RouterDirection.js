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

export const recAddrEditor = parent => {
    if (parent === 'homeBlock') {
        return Actions.recAddrEditorAtHomeBlock
    }
}

export const sendAddrEditor = parent => {
    if (parent === 'homeBlock') {
        return Actions.sendAddrEditorAtHomeBlock
    }
}

export const addrEditor = parent => {
    if (parent === 'homeBlock') {
        return Actions.addrEditorAtHomeBlock
    }
}

export const addressInfo = parent => {
    if (parent === 'homeBlock') {
        return Actions.addressInfoAtHomeBlock
    }
}

export const routeTaskListForOrder = parent => {
    if (parent === 'orderBlock') {
        return Actions.routeTaskListForOrderAtOrderBlock
    }
    if (parent === 'routeBlock') {
        return Actions.routeTaskListForOrderAtRouteBlock
    }
}


export const supplierList = parent => {
    if (parent === 'homeBlock') {
        return Actions.supplierListAtHomeBlock
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