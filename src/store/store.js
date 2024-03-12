import { configureStore } from "@reduxjs/toolkit";
import reducers from "./authSlice"

const store = configureStore({
  reducer: {
    authReducer: reducers
  },
});
export default store;
