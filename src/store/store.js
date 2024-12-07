import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userStatus.js"
import postData from "./PostData.js"

const store = configureStore(
    {
        reducer:{
            user:userSlice,
            posts:postData
        }
    }
);

export {store};