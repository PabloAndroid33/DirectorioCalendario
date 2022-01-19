import { mount } from "enzyme"
import { Provider } from "react-redux"
import configureMockStore  from "redux-mock-store";
import thunk from "redux-thunk";
import { eventStartDeleted } from "../../actions/events";
import { DeleteEventFab } from "../../components/ui/DeleteEventFab";
import '@testing-library/jest-dom';


jest.mock('../../actions/events',()=>({
    eventStartDeleted:jest.fn()
}))
const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const initialState={};
const store=mockStore(initialState);
store.dispatch=jest.fn();
const wrapper=mount(
    <Provider store={store}>
        <DeleteEventFab/>

    </Provider>
)
describe('Prueba en DeleteEventFab',()=>{

    test('Debe de mostrarse corectamente',()=>{

        expect(wrapper).toMatchSnapshot();
    })

    test('Debe de llamar el eventStartDelete al hacer click',()=>{

        wrapper.find('button').prop('onClick')();
        expect(eventStartDeleted).toHaveBeenCalled();
    })
})