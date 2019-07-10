import { Actions } from 'react-native-router-flux'

// export const sendAddressInfoEditor = (sceneName) => {
//     if (sceneName === 'notInfo') {
//         return Actions.sendAddressInfoEditorForNotInfo
//     }
//     if (sceneName === 'notDemand') {
//         return Actions.sendAddressInfoEditorForNotDemand
//     }
//     if (sceneName === 'notPrice') {
//         return Actions.sendAddressInfoEditorForNotPrice
//     }
// }

// export const recAddrEditor = (sceneName) => {
//     if (sceneName === 'notInfo') {
//         return Actions.recAddrEditorForNotInfo
//     }
//     if (sceneName === 'notDemand') {
//         return Actions.recAddrEditorForNotDemand
//     }
//     if (sceneName === 'notPrice') {
//         return Actions.recAddrEditorForNotPrice
//     }
// }



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



