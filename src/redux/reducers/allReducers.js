// redux
import { combineReducers } from "redux"

// category reducers
import selectedTypeReducer from "./category/selectedTypeReducer";
import allCategoriesReducer from "./category/allCategoriesReducer";
import renderedCategoriesReducer from "./category/renderedCategoriesReducer";
import searchTextReducer from "./category/searchTextReducer";
import chosenCategoryReducer from "./category/chosenCategoryReducer"

const allReducers = combineReducers({
  selectedType: selectedTypeReducer,
  allCategories: allCategoriesReducer,
  renderedCategories: renderedCategoriesReducer,
  searchText: searchTextReducer,
  chosenCategory: chosenCategoryReducer,
})

export default allReducers