import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { uiCloseInfoModal } from '../../actions/ui';
import foto from "../../assets/img/foto.JPG";



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

export const CalendarInfoModal=()=>{

    
    const dispatch = useDispatch();
    const {modalInfoOpen} = useSelector( state => state.ui);
    const {activeEvent} = useSelector( state => state.calendar);


    const[formValues,setFormValues]=useState();

useEffect(()=>{
        if (activeEvent) {
            setFormValues(activeEvent);
        }else{
            setFormValues();
        }
        
    },[activeEvent,setFormValues])

  

   
    const closeModal=()=>{
        dispatch(uiCloseInfoModal())
        setFormValues()
     }

    


   
    return(
       
            <Modal
        isOpen={modalInfoOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        ariaHideApp={!process.env.NODE_ENV==='test'}
      >
        <h3>Informacion: Calendario Actividades</h3>
<hr />
<form className="container">

    <center><div className="form-group">
        <label><strong>Detalles del Desarollador</strong></label><br/>
        <small>Nombre:Pablo Siguenza</small><br/>
        <small>Titulo:Ingeniero de Sistemas</small><br/>
        <small>Estudios:Universidad Politecnica Salesiana</small><br/>
        <small>Contacto:0984442903</small><br/>
        <img src={foto} width="200" height="150"/>
        

        
    </div></center>

    

    <hr />
    <div className="form-group">
        <label><strong>Descripción del Proyecto</strong></label>
        <small  className="form-text text-muted">El siguiente proyecto trata de una aplicacion
        de calendario de actividades pudiendo agregar, modificar y eliminar actividades</small>
    </div>

    <div className="form-group">
      
        <small  className="form-text text-muted"><strong>Tecnologias Utilizadas:</strong>Desarollado en React, llamando a base de Datos en la Nube "Mongo Atlas"</small>
    </div>

    <button
        type="button"
        className="btn btn-outline-primary btn-block"
        onClick={closeModal}
    >
        <i class="fas fa-window-close"></i>
        <span> Cerrar</span>
    </button>

</form>
     
     
     
      </Modal>
       
    )
}