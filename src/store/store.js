import { createStore, compose,applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";

//import { composeWithDevTools } from "redux-devtools-extension";


/*const reducers=combineReducers({
   
    root:rootReducer
})*/

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store=createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )

   // composeWithDevTools(applyMiddleware(thunk))
);