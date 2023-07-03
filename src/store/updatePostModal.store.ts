import { createSlice } from "@reduxjs/toolkit";
import { IUpdatePostModalStore } from "../interfaces/store.interface";

const initialState : IUpdatePostModalStore = {
    open:false ,
    postId : ""
}

const updatePostModalSlice = createSlice({
     name:'updatepostmodal',
     initialState,
     reducers: {
        openUpdatePostModal(state , { payload }) {
            state.open = true;
            state.postId = payload;
            return state;
        },
        closeUpdatePostModal(state) {
            state.open = false;
            state.postId = "";
            return state;
        }
     }
});

export default updatePostModalSlice.reducer;
export const { openUpdatePostModal,closeUpdatePostModal } = updatePostModalSlice.actions;