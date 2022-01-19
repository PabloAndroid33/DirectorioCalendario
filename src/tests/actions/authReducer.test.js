import { authReducer } from "../../reducers/authReducer"
import {uiCloseModal, uiOpenModal} from "../../actions/ui";
import { types } from "../../types/types";


 const initialState={
     checking:true
 }
describe('Pruebas en AuthReducer',()=>{
    test('Debe de retornar el estado por defecto',()=>{

        const action={}
        const state=authReducer(initialState,action);
        expect(state).toEqual(initialState)       
    });

    test('Debe de autenticar el usuario',()=>{

        const action={
            type:types.authLogin,
            payload:{
                uid:'123',
                name:'Pablo'
            }
        }

        const state=authReducer(initialState,action);
       ;
         expect(state).toEqual({"checking": false, "name": "Pablo", "uid": "123"})
           
    });
   
})