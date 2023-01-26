import { useState, useEffect } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from "../";
import { localizer, getMessagesEs } from "../../helpers";
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";


export const CalendarPage = () => {

  const { user } = useAuthStore()

  const { openDateModal, toggleDateModal } = useUiStore()

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()

  const [ lastView, setLasView ] = useState( localStorage.getItem("lastView") || "month" );

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid )

    const style = {
      backgroundColor: isMyEvent ? "#347cf7" : "#465660",
      borderRadius: "4px",
      opacity: 0.8,
      color: "#fff",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    openDateModal()
  };

  const onSelect = (event) => {
    setActiveEvent(event)
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event)
    setLasView( event )
  };

  useEffect(() => {
    startLoadingEvents()
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
