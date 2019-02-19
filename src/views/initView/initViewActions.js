

//第一步 获取localStorage host地址
//第二步 获取版本，对比版本
//第三步 获取localStorage
//第四步 获取deviceToken
//第五步 换token

export const waiting = (step) => (dispatch, getState) => {
    let stepKey
    if (!step) {
        //获取步骤

    } else {
        stepKey = step
    }

    if (stepKey == 'getCommunicationSetting') {

        dispatch(getCommunicationSetting())
    } else if (stepKey == 'validateVersion') {
        dispatch(validateVersion())

    } else if (stepKey == 'initPush') {
        dispatch(initPush())

    } else if (stepKey == 'loadLocalStorage') {
        dispatch(loadLocalStorage())

    } else if (stepKey == 'validateToken') {
        dispatch(validateToken())
    }
}


export const success = () => (dispatch, getState) => {
    let stepKey
    if (!step) {
        //获取步骤

    } else {
        stepKey = step
    }

    if (stepKey == 'getCommunicationSetting') {

        dispatch(getCommunicationSetting())
    } else if (stepKey == 'validateVersion') {
        dispatch(validateVersion())

    } else if (stepKey == 'initPush') {
        dispatch(initPush())

    } else if (stepKey == 'loadLocalStorage') {
        dispatch(loadLocalStorage())

    } else if (stepKey == 'validateToken') {
        dispatch(validateToken())
    }
}

export const falied = () => (dispatch, getState) => {
    let stepKey
    if (!step) {
        //获取步骤

    } else {
        stepKey = step
    }

    if (stepKey == 'getCommunicationSetting') {

        dispatch(getCommunicationSetting())
    } else if (stepKey == 'validateVersion') {
        dispatch(validateVersion())

    } else if (stepKey == 'initPush') {
        dispatch(initPush())

    } else if (stepKey == 'loadLocalStorage') {
        dispatch(loadLocalStorage())

    } else if (stepKey == 'validateToken') {
        dispatch(validateToken())
    }
}

export const error = () => (dispatch, getState) => {
    let stepKey
    if (!step) {
        //获取步骤

    } else {
        stepKey = step
    }

    if (stepKey == 'getCommunicationSetting') {

        dispatch(getCommunicationSetting())
    } else if (stepKey == 'validateVersion') {
        dispatch(validateVersion())

    } else if (stepKey == 'initPush') {
        dispatch(initPush())

    } else if (stepKey == 'loadLocalStorage') {
        dispatch(loadLocalStorage())

    } else if (stepKey == 'validateToken') {
        dispatch(validateToken())
    }
}


export const validateVersion = () => (dispatch) => {

}


export const initPush = () => (dispatch) => {

}

export const loadLocalStorage = () => (dispatch) => {

}

export const validateToken = () => (dispatch) => {

}

export const getCommunicationSetting = () => (dispatch) => {

}