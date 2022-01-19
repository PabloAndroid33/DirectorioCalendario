import { useState } from "react";

export const useForm=(initialState={})=>{

const[value,setValue]=useState(initialState);
   
const resetInput=(newFormState=initialState)=>{

    setValue(newFormState);
}

const handleInputChange=({target})=>{
        //console.log(e.target);
        setValue({
            ...value,
            [target.name]:target.value
    
        });
    }

    return[value,handleInputChange,resetInput];

}