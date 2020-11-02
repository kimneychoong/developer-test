import { act } from 'react-dom/test-utils';
import {
  ADD_ITEM,
  DELETE_ITEM,
  SUBMIT_ITEM
} from './actions';

const INITIAL_STATE = {
  wishList: [],
};

// Complete the three cases below
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      let newItem = action.payload;
      state.wishList.push(newItem)
      return {
        state,
      };
    case DELETE_ITEM:
      let deleteItem = action.payload;
      state.wishList = state.wishList.filter((listItem => deleteItem != listItem))
      return {
        state,
      };
    case SUBMIT_ITEM:
        state.wishList = action.payload
        return {
          state
        };
    default:
      return {
        state
      };
  }
};

export default reducer;