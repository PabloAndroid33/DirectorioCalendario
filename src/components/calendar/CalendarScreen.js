import { Navbar } from "../ui/Navbar"

import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from "../../helpers/calendar-messages-es"
import { CalendarEvent } from "./CalendarEvent"
import { useEffect, useState } from "react"
import { CalendarModal } from "./CalendarModal"

import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui"
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from "../../actions/events"
import { AddNewFab } from "../ui/AddNewFab"
import { DeleteEventFab } from "../ui/DeleteEventFab"



moment.locale('es')
const localizer = momentLocalizer(moment)
/*const events=[{
    title:'Cumpleanos del Jefe',
    start:moment().toDate(),
    end:moment().add(2,'hours').toDate(),
    bgcolor:'#fafafa',
    notes:'comprar el pastel',
    user:{
        _id:'123',
        name:'Pablo'
    }

}]*/



export const CalendarScreen=()=>{

    const dispatch = useDispatch();

    const  {events,activeEvent}= useSelector( state => state.calendar);

    const {uid} = useSelector( state => state.auth);

    console.log(events);

    const [lastView,setLastView]=useState(  localStorage.getItem('lastView')||'month');


    useEffect(()=>{
        dispatch(eventStartLoading());
    },[dispatch])

    const onDoubleClick=(e)=>{
        
       // console.log(e)
       dispatch(uiOpenModal());
      // dispatch(uiOpenModal())
    }

    const onSelectEvent=(e)=>{
        //console.log(e)
        dispatch(eventSetActive(e))
        
        
        //console.log('click');
    }

    const onViewChange=(e)=>{
        setLastView(e);
        localStorage.setItem('lastView',e)
    }
    const onSelectSlot=(e)=>{
        dispatch(eventClearActiveEvent());
    }

  

    const eventStyleGetter=(event, start, end, isSelected)=>{
        //console.log(event, start, end, isSelected)


        const style={
            backgroundColor:(uid===event.user._id)?'#367CF7':'#465660',
            borderRadius:'0px',
            opacity:0.8,
            display:'block',
            color:'white'
        }
        return {
            style
        }
    }

    return(
        <div className="calendar-screen">
           <Navbar/>
           <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            onSelectSlot={onSelectSlot}
            selectable={true}
            eventPropGetter={eventStyleGetter}
            components={{
          event:CalendarEvent
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelectEvent}
      onView={onViewChange}
      view={lastView}
    />


         <AddNewFab/>

        {
            (activeEvent)&&<DeleteEventFab/>
        }



    <CalendarModal/>
        </div>
    )
}