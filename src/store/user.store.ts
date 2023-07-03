import { createSlice } from "@reduxjs/toolkit";
import { IUserStore } from "../interfaces/store.interface";
import jwtDecode from "jwt-decode";

const userToken = JSON.parse(localStorage.getItem("myhub_token") || 'null') || null;

const initialState : IUserStore = {
    user:userToken ? jwtDecode(userToken) : null,
    token:userToken  
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setToken: (state , { payload }) => {
             const token = payload;
             if(!token) return;

             state.user = jwtDecode(token);
             state.token = token;
             localStorage.setItem("myhub_token" , JSON.stringify(token));

             return state;
        },
        removeToken: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("myhub_token");
        }
    }
});

export const { setToken,removeToken } = userSlice.actions;

export default userSlice.reducer;
