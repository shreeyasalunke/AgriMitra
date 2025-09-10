import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
// import thunk from "redux-thunk";
import { thunk } from 'redux-thunk'; // ✅ Correct

import authReducer from "./Authentication/Reducer";
import toolownerReducer from "./Authentication/ToolOwner/Reducer";
 import toolItemReducer from "../State/ToolItem/Reducer";
import cartReducer from "../State/Cart/Reducer";
import { orderReducer } from "../State/Orders/Reducer";
import toolownersOrderReducer from "../State/Tool Owner/Reducer";
// import superAdminReducer from "../SuperAdmin/superAdmin.reducer";
// import { ingredientReducer } from "../Admin/Ingredients/Reducer";



const rootReducer=combineReducers({

    auth:authReducer,
    toolowner:toolownerReducer,
    toolitem:toolItemReducer,
    cart:cartReducer,
    order:orderReducer,

  
    toolownerOrder:toolownersOrderReducer,
   

   
})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))
