// Reducers.js
import * as actionTypes from './ActionType';

const initialState = {
 toolItems: [],
  loading: false,
  error: null,
  search:[],
  message:null
};

const toolItemReducer = (state = initialState, action) => {
  switch (action.type) {
    // Reducers.js
case actionTypes.GET_ALL_TOOL_ITEMS_REQUEST:
  return { ...state, loading: true, error: null };

case actionTypes.GET_ALL_TOOL_ITEMS_SUCCESS:
  return { ...state, loading: false, toolItems: action.payload };

case actionTypes.GET_ALL_TOOL_ITEMS_FAILURE:
  return { ...state, loading: false, error: action.payload };

    case actionTypes.CREATE_TOOL_ITEM_REQUEST:
    case actionTypes.GET_TOOL_ITEMS_BY_TOOLOWNER_ID_REQUEST:
    case actionTypes.DELETE_TOOL_ITEM_REQUEST:
    case actionTypes.SEARCH_TOOL_ITEM_REQUEST:
    case actionTypes.UPDATE_TOOL_ITEMS_AVAILABILITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message:null
      };
    case actionTypes.CREATE_TOOL_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
       toolItems: [...state.toolItems, action.payload],
        message:"Food Created Successfully"
      };
    case actionTypes.GET_TOOL_ITEMS_BY_TOOLOWNER_ID_SUCCESS:
      return {
        ...state,
        loading: false,
       toolItems: action.payload,
      };
    case actionTypes.DELETE_TOOL_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
       toolItems: state.toolItems.filter(
          (toolItem) =>toolItem.id !== action.payload
        ),
      };
      case actionTypes.UPDATE_TOOL_ITEMS_AVAILABILITY_SUCCESS:
        console.log("updated items id ",action.payload.id)
      return {
        ...state,
        loading: false,
       toolItems: state.toolItems.map(
          (toolItem) =>toolItem.id === action.payload.id?action.payload:toolItem
        ),
      };
      case actionTypes.SEARCH_TOOL_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        search:action.payload
      };
    case actionTypes.CREATE_TOOL_ITEM_FAILURE:
    case actionTypes.GET_TOOL_ITEMS_BY_TOOLOWNER_ID_FAILURE:
    case actionTypes.DELETE_TOOL_ITEM_FAILURE:
    case actionTypes.SEARCH_TOOL_ITEM_FAILURE:
    case actionTypes.UPDATE_TOOL_ITEMS_AVAILABILITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message:null
      };
    default:
      return state;
  }
};

export default toolItemReducer;
