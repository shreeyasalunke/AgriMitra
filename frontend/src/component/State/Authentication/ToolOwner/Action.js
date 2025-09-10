import {api} from '../../../config/api'
import { CREATE_TOOLOWNER_FAILURE, CREATE_TOOLOWNER_REQUEST, CREATE_TOOLOWNER_SUCCESS, DELETE_TOOLOWNER_FAILURE, DELETE_TOOLOWNER_REQUEST, DELETE_TOOLOWNER_SUCCESS, GET_ALL_TOOLOWNERS_FAILURE, GET_ALL_TOOLOWNERS_REQUEST, GET_ALL_TOOLOWNERS_SUCCESS, GET_TOOLOWNER_BY_ID_FAILURE, GET_TOOLOWNER_BY_ID_REQUEST, GET_TOOLOWNER_BY_ID_SUCCESS, UPDATE_TOOLOWNER_FAILURE, UPDATE_TOOLOWNER_REQUEST, UPDATE_TOOLOWNER_SUCCESS } from './ActionType';

import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_TOOLOWNERS_EVENTS_FAILURE,
  GET_TOOLOWNERS_EVENTS_REQUEST,
  GET_TOOLOWNERS_EVENTS_SUCCESS,
  GET_TOOLOWNERS_CATEGORY_FAILURE,
  GET_TOOLOWNERS_CATEGORY_REQUEST,
  GET_TOOLOWNERS_CATEGORY_SUCCESS,
  GET_TOOLOWNER_BY_USER_ID_FAILURE,
  GET_TOOLOWNER_BY_USER_ID_REQUEST,
  GET_TOOLOWNER_BY_USER_ID_SUCCESS,
  UPDATE_TOOLOWNER_STATUS_FAILURE,
  UPDATE_TOOLOWNER_STATUS_REQUEST,
  UPDATE_TOOLOWNER_STATUS_SUCCESS,
} from "./ActionType";

export const getAllToolOwnersAction = (token) => {
  return async (dispatch) => {
    dispatch({type:GET_ALL_TOOLOWNERS_REQUEST});
    try {
      const { data } = await api.get("/api/toolowner", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({type:GET_ALL_TOOLOWNERS_SUCCESS,payload:data});
      console.log("all toolowner", data);
    } catch (error) {
      dispatch({type:GET_ALL_TOOLOWNERS_FAILURE,payload:error});
    }
  };
};

export const getToolOwnerById = (reqData) => {
  return async (dispatch) => {
    dispatch({type:GET_TOOLOWNER_BY_ID_REQUEST});
    try {
      const response = await api.get(`api/toolowner/${reqData.toolownerId}`, {
        headers: {
          Authorization: `Bearer ${reqData.jwt}`,
        },
      });
       console.log("user profile",response.data);
      dispatch({type:GET_TOOLOWNER_BY_ID_SUCCESS,payload:response.data});
      console.log("user profile",response.data);
    } catch (error) {
      console.log("error",error)
      dispatch({type:GET_TOOLOWNER_BY_ID_FAILURE,payload:error});
    }
  };
};

export const getToolOwnerByUserId = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_TOOLOWNER_BY_USER_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/admin/toolowners/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get toolownerby user id ", data);
      dispatch({ type: GET_TOOLOWNER_BY_USER_ID_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({
        type: GET_TOOLOWNER_BY_USER_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createToolOwner = (reqData) => {
  console.log("token-----------", reqData.token);
  return async (dispatch) => {
    dispatch({type:CREATE_TOOLOWNER_REQUEST});
    try {
      const { data } = await api.post(`/api/admin/toolowners`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({type:CREATE_TOOLOWNER_SUCCESS,payload:data});
      console.log("created toolowner", data);
    } catch (error) {
      console.log("catch error ", error);
      dispatch({type:CREATE_TOOLOWNER_FAILURE,payload:error});
    }
  };
};

export const updateToolOwner = ({ toolownerId, toolownerData, jwt }) => {
  return async (dispatch) => {
    dispatch({type:UPDATE_TOOLOWNER_REQUEST});

    try {
      const res = await api.put(
        `api/admin/toolowner/${toolownerId}`,
        toolownerData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({UPDATE_TOOLOWNER_SUCCESS,payload:res.data});
    } catch (error) {
      dispatch({type:UPDATE_TOOLOWNER_FAILURE,payload:error});
    }
  };
};
export const deleteToolOwner = ({ toolownerId, jwt }) => {
  return async (dispatch) => {
    dispatch({type:DELETE_TOOLOWNER_REQUEST});

    try {
      const res = await api.delete(`/api/admin/toolowner/${toolownerId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete toolowner", res.data);
      dispatch({type:DELETE_TOOLOWNER_SUCCESS,payload:toolownerId});
    } catch (error) {
      console.log("catch error ", error);
      dispatch({type:DELETE_TOOLOWNER_FAILURE,payload:error});
    }
  };
};

export const updateToolOwnerStatus = ({ toolownerId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_TOOLOWNER_STATUS_REQUEST });

    try {
      const res = await api.put(
        `api/admin/toolowners/${toolownerId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("ressssss ", res.data);
      dispatch({ type: UPDATE_TOOLOWNER_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("error ",error)
      dispatch({ type: UPDATE_TOOLOWNER_STATUS_FAILURE, payload: error });
    }
  };
};

export const createEventAction = ({ data, jwt,toolownerId }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_EVENTS_REQUEST });

    try {
      const res = await api.post(
        `api/admin/events/toolowner/${toolownerId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("create events ", res.data);
      dispatch({ type: CREATE_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: CREATE_EVENTS_FAILURE, payload: error });
    }
  };
};

export const getAllEvents = ({ jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });

    try {
      const res = await api.get(`api/events`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all events ", res.data);
      dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
    }
  };
};

export const deleteEventAction = ({ eventId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENTS_REQUEST });

    try {
      const res = await api.delete(`api/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("DELETE events ", res.data);
      dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: DELETE_EVENTS_FAILURE, payload: error });
    }
  };
};

export const getToolOwnersEvents = ({ toolownerId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_TOOLOWNERS_EVENTS_REQUEST });

    try {
      const res = await api.get(
        `/api/admin/events/toolowner/${toolownerId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("get toolowners event ", res.data);
      dispatch({ type: GET_TOOLOWNERS_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_TOOLOWNERS_EVENTS_FAILURE, payload: error });
    }
  };
};

export const createCategoryAction = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    try {
      const res = await api.post(`api/admin/category`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("create category ", res.data);
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch - ", error);
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getToolOwnersCategory = ({ jwt,toolownerId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_TOOLOWNERS_CATEGORY_REQUEST });
    try {
      const res = await api.get(`/api/category/toolowner/${toolownerId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get toolowners category ", res.data);
      dispatch({ type: GET_TOOLOWNERS_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_TOOLOWNERS_CATEGORY_FAILURE, payload: error });
    }
  };
};
