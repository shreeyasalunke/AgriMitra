import { api } from "../../config/api";

import {
    CREATE_TOOL_ITEM_FAILURE,
    CREATE_TOOL_ITEM_REQUEST,
  CREATE_TOOL_ITEM_SUCCESS,
  DELETE_TOOL_ITEM_FAILURE,
  DELETE_TOOL_ITEM_REQUEST,
  DELETE_TOOL_ITEM_SUCCESS,
  GET_ALL_TOOL_ITEMS_FAILURE,
  GET_ALL_TOOL_ITEMS_REQUEST,
  GET_ALL_TOOL_ITEMS_SUCCESS,
  GET_TOOL_ITEMS_BY_TOOLOWNER_ID_FAILURE,
  GET_TOOL_ITEMS_BY_TOOLOWNER_ID_REQUEST,
  GET_TOOL_ITEMS_BY_TOOLOWNER_ID_SUCCESS,
  SEARCH_TOOL_ITEM_FAILURE,
  SEARCH_TOOL_ITEM_REQUEST,
  SEARCH_TOOL_ITEM_SUCCESS,
  UPDATE_TOOL_ITEMS_AVAILABILITY_FAILURE,
  UPDATE_TOOL_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_TOOL_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";

// localhost:5454/api/admin/ingredients/tool/16

export const createToolItem = ({toolitem,jwt}) => {
  return async (dispatch) => {
    dispatch({type:CREATE_TOOL_ITEM_REQUEST});
    try {
      const { data } = await api.post("api/admin/tool", toolitem,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("created toolitem ", data);
      dispatch({type:CREATE_TOOL_ITEM_SUCCESS,payload:data});
    } catch (error) {
      console.log("catch error ", error);
      dispatch({type:CREATE_TOOL_ITEM_FAILURE,payload:error});
    }
  };
};
export const getToolItemsByToolOwnerId = (reqData) => {
  return async (dispatch) => {
    dispatch({type: GET_TOOL_ITEMS_BY_TOOLOWNER_ID_REQUEST});
    try {
      const { data } = await api.get(
        `/api/tool/toolowner/${reqData.toolownerId}?tool_category=${reqData.tool_category || ""}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("Fetched tools: ", data);
      dispatch({type: GET_TOOL_ITEMS_BY_TOOLOWNER_ID_SUCCESS, payload: data});
    } catch (error) {
      console.log("Tool fetch error: ", error);
      dispatch({type: GET_TOOL_ITEMS_BY_TOOLOWNER_ID_FAILURE, payload: error});
    }
  };
};



export const getAllToolItems = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_TOOL_ITEMS_REQUEST });
    try {
      const { data } = await api.get("/api/tool/all"); // 👈 no jwt required
      dispatch({ type: GET_ALL_TOOL_ITEMS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ALL_TOOL_ITEMS_FAILURE, payload: error });
    }
  };
};
// export const getToolItemsByToolOwnerId = (reqData) => {
//   return async (dispatch) => {
//     dispatch({type:GET_TOOL_ITEMS_BY_TOOLOWNER_ID_REQUEST});
//     try {
//       const { data } = await api.get(
//         `/api/tool/toolowner/${reqData.toolownerId}
//         &tool_category=${reqData.toolCategory}`,
//         {
//           headers: {
//             Authorization: `Bearer ${reqData.jwt}`,
//           },
//         }
//       );
//       console.log("toolitem item by toolowners ", data);
//       dispatch({type:GET_TOOL_ITEMS_BY_TOOLOWNER_ID_SUCCESS,payload:data});
//     } catch (error) {
//       dispatch({type:GET_TOOL_ITEMS_BY_TOOLOWNER_ID_FAILURE,payload:error});
//     }
//   };
// };

export const searchToolItem = ({keyword,jwt}) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_TOOL_ITEM_REQUEST });
    try {
      const { data } = await api.get(`api/tool/search?name=${keyword}`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("data ----------- ", data);
      dispatch({ type: SEARCH_TOOL_ITEM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SEARCH_TOOL_ITEM_FAILURE,payload:error });
    }
  };
};

// export const getAllIngredientsOfToolItem = (reqData) => {
//   return async (dispatch) => {
//     dispatch({type:GET_TOOL_ITEM_BY_});
//     try {
//       const { data } = await api.get(
//         `api/tool/toolowner/${reqData.toolownerId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${reqData.jwt}`,
//           },
//         }
//       );
//       console.log("toolitem item by toolowners ", data);
//       dispatch(getToolItemsByToolOwnerIdSuccess(data));
//     } catch (error) {
//       dispatch(getToolItemsByToolOwnerIdFailure(error));
//     }
//   };
// };

export const updateToolItemsAvailability = ({toolId,jwt}) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_TOOL_ITEMS_AVAILABILITY_REQUEST });
    try {
      const { data } = await api.put(`/api/admin/tool/${toolId}`, {},{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("update toolitemItems Availability ", data);
      dispatch({ type: UPDATE_TOOL_ITEMS_AVAILABILITY_SUCCESS, payload: data });
    } catch (error) {
      console.log("error ",error)
      dispatch({
        type: UPDATE_TOOL_ITEMS_AVAILABILITY_FAILURE,
        payload: error,
      });
    }
};
};

export const deleteToolAction = ({toolId,jwt}) => async (dispatch) => {
  dispatch({ type: DELETE_TOOL_ITEM_REQUEST });
  try {
    const { data } = await api.delete(`/api/admin/tool/${toolId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("delete tool ", data);
    dispatch({ type: DELETE_TOOL_ITEM_SUCCESS, payload: toolId });
  } catch (error) {
    dispatch({ type: DELETE_TOOL_ITEM_FAILURE, payload: error });
  }
};
