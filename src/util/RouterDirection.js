import { Actions } from 'react-native-router-flux'

export const sendAddressInfoEditor = (sceneName) => {
    if (sceneName === 'notInfo') {
        return Actions.sendAddressInfoEditorForNotInfo
    }
    if (sceneName === 'notDemand') {
        return Actions.sendAddressInfoEditorForNotDemand
    }
    if (sceneName === 'notPrice') {
        return Actions.sendAddressInfoEditorForNotPrice
    }
}

export const recAddrEditor = (sceneName) => {
    if (sceneName === 'notInfo') {
        return Actions.recAddrEditorForNotInfo
    }
    if (sceneName === 'notDemand') {
        return Actions.recAddrEditorForNotDemand
    }
    if (sceneName === 'notPrice') {
        return Actions.recAddrEditorForNotPrice
    }
}


export const orderRemarkEditor = (sceneName) => {
    if (sceneName === 'notInfo') {
        return Actions.orderNotInfoRemarkEditor
    }
    if (sceneName === 'notDemand') {
        return Actions.orderNotDemandRemarkEditor
    }
    if (sceneName === 'notPrice') {
        return Actions.orderNotPriceRemarkEditor
    }
    if (sceneName === 'notRoute') {
        return Actions.orderNotRouteRemarkEditor
    }
}






