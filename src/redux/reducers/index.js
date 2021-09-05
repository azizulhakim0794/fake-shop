import { combineReducers } from "redux";
import { productReducer,selectedProductReducer,selectBuyNowProductReducer } from "./productReducers";
 const reducers  = combineReducers({
    allProducts:productReducer,
    product:selectedProductReducer,
    buy_now_product:selectBuyNowProductReducer
})
export default reducers