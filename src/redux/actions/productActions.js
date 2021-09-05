import { ActionTypes } from "../contants/action-types"
export const setProducts = (products) => {
    return {
        type: ActionTypes.SET_PRODUCTS,
        payload: products
    }
}
export const selectedProduct = (product) => {
    return {
        type: ActionTypes.SELECTED_PRODUCT,
        payload: product
    }
}

export const removeSelectedProduct = () => {
    return {
        type: ActionTypes.REMOVE_SELECTED_PRODUCT
    }
}
export const removeBuyNowProduct = () => {
    return {
        type: ActionTypes.REMOVE_BUY_NOW_PRODUCT
    }
}
export const selectBuyNowProduct = (product) => {
    return {
        type: ActionTypes.SELECTED_BUY_NOW_PRODUCT,
        payload: product
    }
}