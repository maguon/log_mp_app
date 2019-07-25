import httpRequest from '../../../util/HttpRequest'
import * as reduxActionTypes from '../../../reduxActionTypes'
import { sleep, ObjectToUrl } from '../../../util/util'

const pageSize = 20

export const getInquiryList = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
            loginReducer: { data: { user: { id } } } } = getState()

        let searchReq = {}
        if (req) {
            searchReq = {
                inquiryTimeStart: req.inquiryTimeStart,
                inquiryTimeEnd: req.inquiryTimeEnd,
                serviceType: req.serviceType && req.serviceType.id ? req.serviceType.id : null,
                startCityId: req.startCity && req.startCity.id ? req.startCity.id : null,
                endCityId: req.endCity && req.endCity.id ? req.endCity.id : null,
                status: req.status && req.status.id ? req.status.id : null,
                inquiryId: req.inquiryId
            }
        }
        const url = `${base_host}/admin/${id}/inquiry${ObjectToUrl({
            start: 0,
            size: pageSize,
            ...searchReq
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: reduxActionTypes.inquiryList.get_inquiryList_success, payload: {
                    inquiryList: res.result,
                    isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                    searchParam: req ? req : null
                }
            })
        } else {
            dispatch({ type: reduxActionTypes.inquiryList.get_inquiryList_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.inquiryList.get_inquiryList_error, payload: { errorMsg: `${err}` } })

    }
}

export const getInquiryListWaiting = () => (dispatch) => {
    dispatch({ type: reduxActionTypes.inquiryList.get_inquiryList_waiting })
}

export const getInquiryListMore = () => async (dispatch, getState) => {
    const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { id } } },
        homeReducer: { data: { inquiryList, isCompleted, searchParam } },
        homeReducer } = getState()

    let searchReq = {}
    if (searchParam) {
        searchReq = {
            inquiryTimeStart: searchParam.inquiryTimeStart,
            inquiryTimeEnd: searchParam.inquiryTimeEnd,
            serviceType: searchParam.serviceType && searchParam.serviceType.id ? searchParam.serviceType.id : null,
            startCityId: searchParam.startCity && searchParam.startCity.id ? searchParam.startCity.id : null,
            endCityId: searchParam.endCity && searchParam.endCity.id ? searchParam.endCity.id : null,
            status: searchParam.status && searchParam.status.id ? searchParam.status.id : null,
            inquiryId: searchParam.inquiryId
        }
    }
    if (homeReducer.getInquiryListMore.isResultStatus == 1) {
        await sleep(1000)
        dispatch(getInquiryListMore)
    } else {
        if (!isCompleted) {
            dispatch({ type: reduxActionTypes.inquiryList.get_inquiryListMore_waiting, payload: {} })
            try {
                const url = `${base_host}/admin/${id}/inquiry${ObjectToUrl({
                    start: inquiryList.length,
                    size: pageSize,
                    ...searchReq
                })}`
                const res = await httpRequest.get(url)
                if (res.success) {
                    dispatch({
                        type: reduxActionTypes.inquiryList.get_inquiryListMore_success, payload: {
                            inquiryList: res.result,
                            isCompleted: (res.result.length == 0 || res.result.length % pageSize != 0),
                        }
                    })
                } else {
                    dispatch({ type: reduxActionTypes.inquiryList.get_inquiryListMore_failed, payload: { failedMsg: `${res.msg}` } })
                }
            } catch (err) {
                dispatch({ type: reduxActionTypes.inquiryList.get_inquiryListMore_error, payload: { errorMsg: `${err}` } })
            }
        }
        // else {
        //     // ToastAndroid.show('已全部加载完毕！', 10)
        // }
    }
}

export const getInquiryById = req => async (dispatch, getState) => {
    try {
        const { communicationSettingReducer: { data: { base_host } },
        loginReducer: { data: { user: { id } } } } = getState()
        const url = `${base_host}/admin/${id}/inquiry?inquiryId=${req.inquiryId}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: reduxActionTypes.inquiryList.get_inquiryById_success, payload: { inquiryInfo: res.result[0] } })

        } else {
            dispatch({ type: reduxActionTypes.inquiryList.get_inquiryById_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        dispatch({ type: reduxActionTypes.inquiryList.get_inquiryById_error, payload: { errorMsg: `${err}` } })

    }
}

