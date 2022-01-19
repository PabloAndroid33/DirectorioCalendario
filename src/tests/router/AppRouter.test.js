import { mount } from "enzyme"
import { Provider } from "react-redux"
import configureMockStore  from "redux-mock-store";
import thunk from "redux-thunk";

import '@testing-library/jest-dom';
import { AppRouter } from "../../components/router/AppRouter";



const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

//store.dispatch=jest.fn();



describe('Pruebas en AppRouter',()=>{

    
    test('Debe de Mostrar el Espere',()=>{
        const initialState={
            auth:{
                checking:true
            }
        };
        const store=mockStore(initialState);
        const wrapper=mount(
            <Provider store={store}>
                <AppRouter/>
        
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
       // expect(wrapper.find('h5').exists()).toBe(true)
    })

    test('Debe de Mostrar la Ruta Publica',()=>{
        const initialState={
            auth:{
                checking:false,
                uid:null
            }
        };
        const store=mockStore(initialState);
        const wrapper=mount(
            <Provider store={store}>
                <AppRouter/>
        
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBe(true);
    
    })


    test('Debe de Mostrar la Ruta Privada',()=>{
        const initialState={
             
            calendar:{
                events:[]
            },
            ui:{
                modalOpen:false
            },
            auth:{
                checking:false,
                uid:'123',
                name:'Pablo'
            }
        };
        const store=mockStore(initialState);
        const wrapper=mount(
            <Provider store={store}>
                <AppRouter/>
        
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.calendar-screen').exists()).toBe(true);
    
    })


})