import { useDispatch } from "react-redux"
import { eventDeleted, eventStartDeleted } from "../../actions/events";



export const DeleteEventFab=()=>{

    const dispatch = useDispatch();
    const handleDeleted=()=>{
       dispatch(eventStartDeleted());
    }
    return(
        <button
        className="btn btn-danger fab-danger"
        onClick={handleDeleted}
        >
            <i className="fas fa-trash"></i>
            <span>Borrar Evento</span>
        </button>
    )
}