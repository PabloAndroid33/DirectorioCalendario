import { mount } from "enzyme"
import { Provider } from "react-redux"
import configureMockStore  from "redux-mock-store";
import thunk from "redux-thunk";


import '@testing-library/jest-dom';
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startLogin,startRegister } from "../../../actions/auth";
import Swal from "sweetalert2";




jest.mock('../../../actions/auth',()=>({
    startLogin:jest.fn(),
    startRegister:jest.fn()
}))

jest.mock('sweetalert2',()=>({
    fire:jest.fn(),
  
}))
const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const initialState={};
const store=mockStore(initialState);
store.dispatch=jest.fn();
const wrapper=mount(
    <Provider store={store}>
        <LoginScreen/>

    </Provider>
)

describe('Pruebas en Login Screen',()=>{

    beforeEach(()=>{
        jest.clearAllMocks();
    })

        test('Debe mostrar correctamente',()=>{

            expect(wrapper).toMatchSnapshot();

        })

        test('Debe llamar el dispatch del Login',()=>{

            wrapper.find('input[name="lEmail"]').simulate('change',{
                target:{
                    name:'lEmail',
                    value:'pbsiguenza@hotmail.com'
                }
            })
        
            wrapper.find('input[name="lPassword"]').simulate('change',{
                target:{
                    name:'lPassword',
                    value:'123456'
                }
            })

            wrapper.find('form').at(0).prop('onSubmit')({
                preventDefault(){}
            });

            expect(startLogin).toHaveBeenCalledWith('pbsiguenza@hotmail.com','123456')
    
    
        })


        test('No ahi registro si contrasenas diferentes',()=>{

            wrapper.find('input[name="rPassword1"]').simulate('change',{
                target:{
                    name:'rPassword1',
                    value:'123468'
                }
            })
        
            wrapper.find('input[name="rPassword2"]').simulate('change',{
                target:{
                    name:'rPassword2',
                    value:'123456'
                }
            })

            //'Error','Las Passwords deben de ser Iguales','error'
            wrapper.find('form').at(1).prop('onSubmit')({
                preventDefault(){}
            });
           
            expect(startRegister).not.toHaveBeenCalled();

            expect(Swal.fire).toHaveBeenCalledWith('Error','Las Passwords deben de ser Iguales','error')
        })


        test('Dispara con Password Iguales',()=>{

            
            wrapper.find('input[name="rPassword1"]').simulate('change',{
                target:{
                    name:'rPassword1',
                    value:'123456'
                }
            })
        
            wrapper.find('input[name="rPassword2"]').simulate('change',{
                target:{
                    name:'rPassword2',
                    value:'123456'
                }
            })

            //'Error','Las Passwords deben de ser Iguales','error'
            wrapper.find('form').at(1).prop('onSubmit')({
                preventDefault(){}
            });
           
            expect(Swal.fire).not.toHaveBeenCalled();

            expect(startRegister).toHaveBeenCalledWith("andrez@hotmail.com", "123456", "Andrez")


        })
})