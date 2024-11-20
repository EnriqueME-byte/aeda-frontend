import { types } from "../tipos/types"


export const registraReducer = (state ={}, action) => {
    switch(action.type){
        case types.signup :
            return {
                ...action.payload,
                registrado : true
            }

        case types.cancel :
            return{
                registrado : false
            }
            default :
            return state;
    }
}