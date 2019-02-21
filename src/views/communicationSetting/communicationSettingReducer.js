import { handleActions } from 'redux-actions'

const initialState = {
    data: {
        base_host: 'http://stg.myxxjs.com:9001/api',
        file_host: 'http://stg.myxxjs.com:9002/api',
        record_host: 'http://stg.myxxjs.com:9004/api'
    }
}

export default handleActions({}, initialState)
