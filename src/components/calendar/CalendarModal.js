
//import { useState } from 'react';
import Modal from 'react-modal';
import moment from "moment";
import DateTimePicker from 'react-datetime-picker';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated,eventStartAddNew, eventStartUpdated} from '../../actions/events';





const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

 
if (process.env.NODE_ENV!=='test') {
    Modal.setAppElement('#root');
    
}


  const now=moment().minutes(0).seconds(0).add(1,'hours');//
  const finisher=now.clone().add(1, 'hours');

  const initEvent={
    title:'',
    notes:'',
    start:now.toDate(),
    end:finisher.toDate()
}
export const CalendarModal=()=>{

    
    const dispatch = useDispatch();
    const {modalOpen} = useSelector( state => state.ui);
    const {activeEvent} = useSelector( state => state.calendar);

    const[dateStart,setDateStart]=useState(now.toDate());
    const[dateFinish,setDateFinish]=useState(finisher.toDate());
    const[formValues,setFormValues]=useState(initEvent);

    const[titleValid,setTitleValid]=useState(true);


    const {notes,title,start,end}=formValues;


    useEffect(()=>{
        if (activeEvent) {
            setFormValues(activeEvent);
        }else{
            setFormValues(initEvent);
        }
        
    },[activeEvent,setFormValues])

    const handleInputChange=({target})=>{
        setFormValues({
            ...formValues,
            [target.name]:target.value
        })
    }

   
    const closeModal=()=>{
        dispatch(uiCloseModal())
        dispatch(eventClearActiveEvent())
        setFormValues(initEvent)
     }

     const handleStartDateChange=(e)=>{
        setDateStart(e);
        setFormValues({
            ...formValues,
            start:e
        })
     }

     const handleFinishDateChange=(e)=>{
        setDateFinish(e);
        setFormValues({
            ...formValues,
            end:e
        })
     }


     const handleSubmitForm=(e)=>{
        e.preventDefault();
       

        const momentStart=moment(start);
        const momentFinish=moment(end);

        if (momentStart.isSameOrAfter(momentFinish)) {
            //console.log('fecha 2 debe ser mayor');
            Swal.fire('Error','La fecha fin debe de ser mayor a la fecha de inicio','error')
            return;
        }
        if (title.trim()<2) {
            
            return setTitleValid(false);
        }


        if(activeEvent){
            dispatch(eventStartUpdated(formValues))
        }else{
        dispatch(eventStartAddNew(formValues))

    }

        //Realizar 
        setTitleValid(true);
        closeModal();
     }
    return(
       
            <Modal
        isOpen={modalOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        ariaHideApp={!process.env.NODE_ENV==='test'}
      >
        <h1>{(activeEvent)?'Editar Evento':'Nuevo Evento'}</h1>
<hr />
<form className="container"
onSubmit={handleSubmitForm}>

    <div className="form-group">
        <label>Fecha y hora inicio</label>
        <DateTimePicker
        onChange={handleStartDateChange}
        value={dateStart}
        className="form-control react-datatime-picker"
      />
    </div>

    <div className="form-group">
        <label>Fecha y hora fin</label>
        <DateTimePicker
        onChange={handleFinishDateChange}
        value={dateFinish}
        className="form-control react-datatime-picker"
        minDate={dateStart}

      />
    </div>

    <hr />
    <div className="form-group">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
     
     
     
      </Modal>
       
    )
}