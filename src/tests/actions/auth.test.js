import configureMockStore  from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import * as fetchModule from "../../helpers/fetch";
import { types } from "../../types/types";




fetchModule.fetchConToken
jest.mock('sweetalert2',()=>({
    fire:jest.fn()
}));

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const initialState={};
let store=mockStore(initialState);

Storage.prototype.setItem=jest.fn();
describe('Pruebas en las acciones del auth',()=>{

    beforeEach(()=>{
        store=mockStore(initialState);
        jest.clearAllMocks();
    })
    test('startLogin correcto',async()=>{

        await store.dispatch(startLogin('pbsiguenza@hotmail.com','123456'));
        const actions=store.getActions();
        expect(actions[0]).toEqual({
            type:types.authLogin,
            payload:{
                uid:expect.any(String),
                name:expect.any(String)
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token',expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date',expect.any(Number));
        //token=localStorage.setItem.mock.calls[0][1];



        //console.log(actions)
    })



    test('starLogin incorecto',async()=>{

        await store.dispatch(startLogin('pbsiguenza@hotmail.com','123456789'));
        let actions=store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Password Incorecto", "error");

        await store.dispatch(startLogin('pb2siguenza@hotmail66.com','123456'));
         actions=store.getActions();
         expect(Swal.fire).toHaveBeenCalledWith("Error", "El usuario no existe con ese email", "error");


        

    })

    test('startRegister Corecto',async()=>{

        fetchModule.fetchSinToken=jest.fn(()=>({
            json(){
                return{
                    ok:true,
                    uid:'123',
                    name:'carlos',
                    token:'ABC123ABE124'
                }
            }
        }));

        await store.dispatch(startRegister('test@test.com','123456','test'));
        const actions=store.getActions();

        expect(actions[0]).toEqual({
            type:types.authLogin,
            payload:{
                uid:'123',
                name:'carlos'
            }
        })


        expect(localStorage.setItem).toHaveBeenCalledWith('token','ABC123ABE124');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date',expect.any(Number));

        //console.actions(actions);

    })



    test('start Checking corecto',async()=>{

        fetchModule.fetchConToken=jest.fn(()=>({
            json(){
                return{
                    ok:true,
                    uid:'123',
                    name:'carlos',
                    token:'ABC123ABE124'
                }
            }
        }));


        await store.dispatch(startChecking());
        const actions=store.getActions();

        expect(actions[0]).toEqual({
            type:types.authLogin,
            payload:{
                uid:'123',
                name:'carlos'
            }
        });

      expect(localStorage.setItem).toHaveBeenCalledWith('token','ABC123ABE124')
    })
})