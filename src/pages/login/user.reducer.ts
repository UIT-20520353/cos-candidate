import { IUser } from "~/types/user.type";
import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState: IUser = {
  id: -1,
  name: ""
};

export const userLogin = createAction<IUser>("user/login");
export const userLogout = createAction("user/logout");

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(userLogin, (state, action) => {
      const user = action.payload;
      state.id = user.id;
      state.name = user.name;
    })
    .addCase(userLogout, (state) => {
      state.id = -1;
      state.name = "";
    });
});

export default userReducer;
