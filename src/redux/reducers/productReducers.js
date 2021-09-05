import { ActionTypes } from "../contants/action-types";
const initialState = {
    products:[]
}
export const productReducer = (state = initialState,{type,payload})=>{
    switch (type) {
        case ActionTypes.SET_PRODUCTS:
            return {...state , products:payload}
        default:
            return state
    }
}
export const selectedProductReducer = (state = initialState,{type,payload})=>{
    switch (type) {
        case ActionTypes.SELECTED_PRODUCT:
            return {...state , ...payload}
            case ActionTypes.REMOVE_SELECTED_PRODUCT:
                return {}
        default:
            return state
    }
}
export const selectBuyNowProductReducer = (state = initialState,{type,payload})=>{
    switch (type) {
        case ActionTypes.SELECTED_BUY_NOW_PRODUCT:
            return {...state , ...payload}
            case ActionTypes.REMOVE_BUY_NOW_PRODUCT:
                return {}
        default:
            return state
    }
}
