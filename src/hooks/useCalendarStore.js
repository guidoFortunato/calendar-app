import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {

    try {
      if (calendarEvent.id) {
        //actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      //creando
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
      
    } catch (error) {
      console.log({error})
      Swal.fire('Error al guardar', error.response.data?.msg, 'error')
    }
    
  };

  const startDeletingEvent = async() => {
    //llegar al backend y elimina

    try {
      
      await calendarApi.delete(`/events/${ activeEvent.id }`)

      dispatch(onDeleteEvent());
    } catch (error) {
      console.log({error})
      Swal.fire('Error al eliminar', error.response.data?.msg, 'error')
    }


  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvent(events));
    } catch (error) {
      console.log("error cargando eventos");
      console.log(error);
    }
  };

  return {
    //propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //metodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
