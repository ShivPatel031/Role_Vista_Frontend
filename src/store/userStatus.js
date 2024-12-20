import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData:null
}

const userSlice = createSlice(
    {
        name:"user",
        initialState,
        reducers:{
            login:(state,action)=>
            {
             const newState = {...state,status:true,userData:action.payload} 
             return newState
            },
            logout: (state,) => {
                state.status= false;
                state.userData= null;
                return state;
            },
        }
    }
);

export const {login,logout} = userSlice.actions;

export default userSlice.reducer;