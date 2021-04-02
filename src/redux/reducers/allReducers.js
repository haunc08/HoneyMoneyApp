// redux
import { combineReducers } from "redux"

// category reducers
import selectedTypeReducer from "./category/selectedTypeReducer";
import allCategoriesReducer from "./category/allCategoriesReducer";
import renderedCategoriesReducer from "./category/renderedCategoriesReducer";
import searchTextReducer from "./category/searchTextReducer";
import chosenCategoryReducer from "./category/chosenCategoryReducer"
import addedSubCategoriesReducer from "./category/addedSubCategoriesReducer";
import categoryNameReducer from "./category/categoryNameReducer";
import selectedIconReducer from "./category/selectedIconReducer";
import subCategoriesReducer from "./category/subCategoriesReducer";

const allReducers = combineReducers({
  selectedType: selectedTypeReducer,
  allCategories: allCategoriesReducer,
  renderedCategories: renderedCategoriesReducer,
  searchText: searchTextReducer,
  chosenCategory: chosenCategoryReducer,
  addedSubCategories: addedSubCategoriesReducer,
  categoryName: categoryNameReducer,
  selectedIcon: selectedIconReducer,
  subCategories: subCategoriesReducer,
})

export default allReducers