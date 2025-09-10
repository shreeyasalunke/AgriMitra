// Reducers.js
import * as actionTypes from "./ActionType";

const initialState = {
  toolowners: [],
  usersToolOwner: null,
  toolowner: null,
  loading: false,
  error: null,
  events: [],
  toolownersEvents: [],
  categories: [],
};

const toolownerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_TOOLOWNER_REQUEST:
    case actionTypes.GET_ALL_TOOLOWNERS_REQUEST:
    case actionTypes.DELETE_TOOLOWNER_REQUEST:
    case actionTypes.UPDATE_TOOLOWNER_REQUEST:
    case actionTypes.GET_TOOLOWNER_BY_ID_REQUEST:
    case actionTypes.CREATE_CATEGORY_REQUEST:
    case actionTypes.GET_TOOLOWNERS_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_TOOLOWNER_SUCCESS:
      return {
        ...state,
        loading: false,
        usersToolOwner:action.payload
      };
    case actionTypes.GET_ALL_TOOLOWNERS_SUCCESS:
      return {
        ...state,
        loading: false,
        toolowners: action.payload,
      };
    case actionTypes.GET_TOOLOWNER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        toolowner: action.payload,
      };
    case actionTypes.GET_TOOLOWNER_BY_USER_ID_SUCCESS:
    case actionTypes.UPDATE_TOOLOWNER_STATUS_SUCCESS:
    case actionTypes.UPDATE_TOOLOWNER_SUCCESS:
      return {
        ...state,
        loading: false,
        usersToolOwner: action.payload,
      };

    case actionTypes.DELETE_TOOLOWNER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        toolowners: state.toolowners.filter(
          (item) => item.id !== action.payload
        ),
        usersToolOwner: state.usersToolOwner.filter(
          (item) => item.id !== action.payload
        ),
      };

    case actionTypes.CREATE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
        toolownersEvents: [...state.toolownersEvents, action.payload],
      };
    case actionTypes.GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case actionTypes.GET_TOOLOWNERS_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        toolownersEvents: action.payload,
      };
    case actionTypes.DELETE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter((item) => item.id !== action.payload),
        toolownersEvents: state.toolownersEvents.filter(
          (item) => item.id !== action.payload
        ),
      };
    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };
    case actionTypes.GET_TOOLOWNERS_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case actionTypes.CREATE_TOOLOWNER_FAILURE:
    case actionTypes.GET_ALL_TOOLOWNERS_FAILURE:
    case actionTypes.DELETE_TOOLOWNER_FAILURE:
    case actionTypes.UPDATE_TOOLOWNER_FAILURE:
    case actionTypes.GET_TOOLOWNER_BY_ID_FAILURE:
    case actionTypes.CREATE_EVENTS_FAILURE:
    case actionTypes.CREATE_CATEGORY_FAILURE:
    case actionTypes.GET_TOOLOWNERS_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default toolownerReducer;
