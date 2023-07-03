import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import wrapperAlertStore from "./wrapperAlert.store";
import userStore from "./user.store";
import updatePostModalStore from "./updatePostModal.store";
import updateProfileModal from "./updateProfileModal";

const store = configureStore({
     reducer: {
        auth : userStore,
        wrapperAlert:wrapperAlertStore,
        updatePostModal : updatePostModalStore,
        updateProfileModal : updateProfileModal
     }
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;