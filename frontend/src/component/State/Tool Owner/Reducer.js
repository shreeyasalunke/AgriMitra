// reducers.js
import {
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  GET_TOOLOWNERS_ORDER_REQUEST,
  GET_TOOLOWNERS_ORDER_SUCCESS,
  GET_TOOLOWNERS_ORDER_FAILURE,
} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  orders:[]
};

const toolownersOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOOLOWNERS_ORDER_REQUEST:
    case UPDATE_ORDER_STATUS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_TOOLOWNERS_ORDER_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case UPDATE_ORDER_STATUS_SUCCESS:
      { const updatedOrders = state.orders.map((order) => 
        order.id === action.payload.id?action.payload:order
      );
      return { ...state, loading: false, orders: updatedOrders }; }
    case GET_TOOLOWNERS_ORDER_FAILURE:
    case UPDATE_ORDER_STATUS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default toolownersOrderReducer;
