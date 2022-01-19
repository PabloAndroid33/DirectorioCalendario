import { useDispatch, useSelector } from "react-redux"
import { startLogout } from "../../actions/auth";
import { ViewInfo } from "./ViewInfo";
import { CalendarInfoModal } from "../calendar/CalendarInfoModal";

export const Navbar=()=>{

    const dispatch = useDispatch();

    
    const handleLogount=()=>{
        dispatch(startLogout());
    }

const {name} = useSelector( state => state.auth);
    return(<>
    <div className="navbar navbar-dark bg-dark mb-4">
        <span className="navbar-brand">
        <i class="fas fa-user-tie"></i>
            {name}
        </span>
        
        <ViewInfo/>
        <button className="btn btn-outline-danger"
        onClick={handleLogount}>
            <i className="fas fa-sign-out-alt"></i>
            <span> SALIR</span>
        </button>

       
        <CalendarInfoModal/>  

        </div>
        
      
        
       </>)
}