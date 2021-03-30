// redux
import { createStore } from "redux";

// reducers
import allReducers from "./reducers/allReducers";

const store = () => createStore(allReducers)
export default store