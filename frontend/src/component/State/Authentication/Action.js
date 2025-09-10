import {
  ADD_TO_FAVORITES_FAILURE,
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REQUEST_RESET_PASSWORD_FAILURE,
  REQUEST_RESET_PASSWORD_REQUEST,
  REQUEST_RESET_PASSWORD_SUCCESS,
} from "./ActionType";
import { API_URL, api } from "../../config/api";
import axios from "axios";

export const registerUser = (reqData) => async (dispatch) => {
  console.log("resgister request data ",reqData.userData)
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
    if(data.jwt) localStorage.setItem("jwt",data.jwt)
    if(data.role==="ROLE_TOOL_OWNER"){
      reqData.navigate("/admin/toolowners")
    }
    else{
      reqData.navigate("/")
    }
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("catch error ------ ",error)
    dispatch({
      type: REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const loginUser = (reqData) => async (dispatch) => {
//   try {
//     dispatch({ type: LOGIN_REQUEST });

//     const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);
//     if(data.jwt) localStorage.setItem("jwt",data.jwt)
//     if(data.role==="ROLE_TOOL_OWNER"){
//       reqData.navigate("/admin/toolowners")
//     }
//     else{
//       reqData.navigate("/")
//     }
    
//     dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
//     dispatch(getUser(data.jwt));
    
//   } catch (error) {
//     dispatch({
//       type: LOGIN_FAILURE,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const loginUser = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);

    console.log("Login API full response:", data); // 👈 Ye token + role sab dikhayega

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      console.log("JWT stored:", data.jwt); // 👈 Ye confirm karega token save hua ya nahi
    }

    console.log("User role from API:", data.role); // 👈 Role check

    if (data.role === "ROLE_TOOL_OWNER") {
      reqData.navigate("/admin/toolowners");
    } else {
      reqData.navigate("/");
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });

    // 👇 Token ke sath getUser call + debugging
    console.log("Calling getUser with token:", data.jwt);
    dispatch(getUser(data.jwt));

  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    dispatch({
      type: LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const getUser = (token) => {
//   return async (dispatch) => {
//     dispatch({ type: GET_USER_REQUEST });
//     try {
//       const response = await api.get(`/api/users/profile`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const user = response.data;
//       console.log("user",response.data)
//       dispatch({ type: GET_USER_SUCCESS, payload: user });
//       console.log("req User ", user);
//     } catch (error) {
//       console.log("error",error);
      
//       const errorMessage = error.message;
//       dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
//     }
//   };
// };
export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      console.log("Fetching user profile with token:", token); // 👈 Confirm token

      const response = await api.get(`/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User profile API response:", response.data); // 👈 Full profile

      dispatch({ type: GET_USER_SUCCESS, payload: response.data });

    } catch (error) {
      console.error("getUser API error:", error.response?.data || error.message);
      dispatch({ type: GET_USER_FAILURE, payload: error.message });
    }
  };
};


export const addToFavorites = ({toolownerId,jwt}) => {
  return async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITES_REQUEST });
    try {
      const { data } = await api.put(`api/toolowner/${toolownerId}/add-favorites`,{},{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Add to favorites ",data)
      dispatch({ type: ADD_TO_FAVORITES_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error ",error)
      dispatch({
        type: ADD_TO_FAVORITES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const resetPasswordRequest = (email) => async (dispatch) => {
  dispatch({type:REQUEST_RESET_PASSWORD_REQUEST});
  try {
    const {data} = await axios.post(`${API_URL}/auth/reset-password-request?email=${email}`,{});
    
    console.log("reset password -: ", data);
   
    dispatch({type:REQUEST_RESET_PASSWORD_SUCCESS,payload:data});
  } catch (error) {
    console.log("error ",error)
    dispatch({type:REQUEST_RESET_PASSWORD_FAILURE,payload:error.message});
  }
};

export const resetPassword = (reqData) => async (dispatch) => {
  dispatch({type:REQUEST_RESET_PASSWORD_REQUEST});
  try {
    const {data} = await axios.post(`${API_URL}/auth/reset-password`,reqData.data);
    
    console.log("reset password -: ", data);

    reqData.navigate("/password-change-success")
   
    dispatch({type:REQUEST_RESET_PASSWORD_SUCCESS,payload:data});
  } catch (error) {
    console.log("error ",error)
    dispatch({type:REQUEST_RESET_PASSWORD_FAILURE,payload:error.message});
  }
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    // localStorage.clear();
    localStorage.removeItem("jwt");

  };
};



