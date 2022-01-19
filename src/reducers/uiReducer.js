import { types } from "../types/types";


const initialState={
    modalOpen:false,
    modalInfoOpen:false,
}

export const uiReducer=(state=initialState,action)=>{
    switch (action.type) {
        case types.uiOpenModal:
            
            return{
                ...state,
                modalOpen:true

            };

        case types.uiCloseModal:
            
                return{
                    ...state,
                    modalOpen:false
                }

         case types.uiOpenInfoModal:
            
                    return{
                        ...state,
                        modalInfoOpen:true
        
                    };
        
        case types.uiCloseInfoModal:
                    
                        return{
                            ...state,
                            modalInfoOpen:false
                        }
    
    
        default:
            return state;
    }

}