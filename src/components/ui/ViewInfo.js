import { useDispatch } from "react-redux";
import { uiOpenInfoModal } from "../../actions/ui";

export const ViewInfo=()=>{
    const dispatch = useDispatch();

    const handleClickNew=()=>{
        dispatch(uiOpenInfoModal());
    }
    
    return(
        <button className="btn btn-outline-info"
        onClick={handleClickNew}>
     <i class="fas fa-info-circle"></i>
        <span> INFO</span>
</button>
    )
}