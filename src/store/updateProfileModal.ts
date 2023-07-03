import { createSlice } from "@reduxjs/toolkit";
import { IUpdateProfileModalStore } from "../interfaces/store.interface";

const initialState : IUpdateProfileModalStore = {
    open:false,
    userId:""
}

const updateProfileModalSlice = createSlice({
    name:'updateProfileModal',
    initialState,
    reducers: {
        openProfileModal(state, { payload }) {
             state.open = true;
             state.userId = payload;

             return state;
        },
        closeProfileModal(state) {
           state.open = false;
           state.userId = "";

           return state;
        }
    }
});

export default updateProfileModalSlice.reducer;
export const { openProfileModal,closeProfileModal } = updateProfileModalSlice.actions;