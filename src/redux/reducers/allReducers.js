// redux
import { combineReducers } from "redux"

const selectedTypeReducer = (state = 1, action) => {
  if(action.type === 'CHANGE_TYPE') {
      return action.selectedType
  }
  return state;
}

const allReducers = combineReducers({
  selectedTypeReducer
})

export default allReducers