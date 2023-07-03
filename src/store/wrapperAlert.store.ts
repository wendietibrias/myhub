import { createSlice } from "@reduxjs/toolkit";
import { IWrapperAlertStore } from "../interfaces/store.interface";

const initialState : IWrapperAlertStore = {
    open:false,
    message:"",
    type:""
}

const wrapperAlertSlice = createSlice({
    name:'wrapperAlert',
    initialState,
    reducers : {
        openWrapperAlert(state, { payload }) {
            state.message = payload.message;
            state.open = true;
            state.type = payload.type;

            return state
        },
        closeWrapperAlert(state) {
            state.open = false;
            state.message = "";
            state.type = "";

            return state;
        }
    }
});

export const { openWrapperAlert,closeWrapperAlert } = wrapperAlertSlice.actions;
export default wrapperAlertSlice.reducer;