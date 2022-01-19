import { mount } from "enzyme"
import { Provider } from "react-redux"
import configureMockStore  from "redux-mock-store";
import thunk from "redux-thunk";


import '@testing-library/jest-dom';

import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { messages } from "../../../helpers/calendar-messages-es";
import { types } from "../../../types/types";
import { eventSetActive,eventStartLoading } from "../../../actions/events";




jest.mock('../../../actions/events',()=>({
    eventSetActive:jest.fn(),
    eventStartLoading:jest.fn()
   
}))

Storage.prototype.setItem=jest.fn();

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const initialState={
    calendar:{
        events:[]
    },
    auth:{
        uid:'123',
        name:'Pablo'
    },
    ui:{
        openModal:false
    }
};
const store=mockStore(initialState);
store.dispatch=jest.fn();
const wrapper=mount(
    <Provider store={store}>
        <CalendarScreen/>

    </Provider>
)

describe('Pruebas en Calendar Screen',()=>{

    test('Debe de mostrarse correctamente',()=>{
        expect(wrapper).toMatchSnapshot();
    })

    test('Pruebas con las interacciones del calendario',()=>{
        const calendar=wrapper.find('Calendar');
        

        const calendarMesages=calendar.prop('messages');


        expect(calendarMesages).toEqual(messages)


        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({type:types.uiOpenModal})
       // console.log(calendarMesages)

       calendar.prop('onSelectEvent')({start:'Hola'});
       expect(eventSetActive).toHaveBeenCalledWith({start:'Hola'})


       calendar.prop('onView')('week');
       expect(localStorage.setItem).toHaveBeenCalledWith('lastView','week')

    })



})