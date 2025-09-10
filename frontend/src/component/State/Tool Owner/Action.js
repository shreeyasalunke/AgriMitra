// actions.js
// import axios from "axios";
import {
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  GET_TOOLOWNERS_ORDER_REQUEST,
  GET_TOOLOWNERS_ORDER_SUCCESS,
  GET_TOOLOWNERS_ORDER_FAILURE,
} from "./ActionType";
import { api } from "../../config/api";

export const updateOrderStatus = ({orderId,orderStatus,jwt}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

      const response = await api.put(
        `/api/admin/orders/${orderId}/${orderStatus}`,{},{
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const updatedOrder = response.data;

      console.log("udpdated order ", updatedOrder);

      dispatch({
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: updatedOrder,
      });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, error });
    }
  };
};

export const fetchToolOwnersOrder = ({toolownerId,orderStatus,jwt}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_TOOLOWNERS_ORDER_REQUEST });

      const { data } = await api.get(
        `/api/admin/order/toolowner/${toolownerId}`,{
          params: { order_status:orderStatus},
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const orders = data;
      console.log("toolowners order ------ ", orders);
      dispatch({
        type: GET_TOOLOWNERS_ORDER_SUCCESS,
        payload: orders,
      });
    } catch (error) {
      dispatch({ type: GET_TOOLOWNERS_ORDER_FAILURE, error });
    }
  };
};
