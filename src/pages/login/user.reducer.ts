import { IUser } from "../../types/user.type";
import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState: IUser = {
  id: "",
  name: ""
};

export const userLogin = createAction<IUser>("user/login");

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(userLogin, (state, action) => {
    const user = action.payload;
    state.id = user.id;
    state.name = user.name;
  });
});

export default userReducer;
