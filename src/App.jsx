import React, { useState, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventList from "./EventList";
import EventModal from "./EventModal";
const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(JSON.parse(localStorage.getItem("events")) || {});
  const [eventDetails, setEventDetails] = useState({ name: "", startTime: "", endTime: "", description: "" });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date.toDateString());
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) return;
  
    const dateEvents = events[selectedDate] || [];
    console.log("Before adding event:", eventDetails);
  
    const hasOverlap = dateEvents.some(
      (event) =>
        event.startTime < eventDetails.endTime && eventDetails.startTime < event.endTime
    );
  
    if (hasOverlap) {
      alert("Event times overlap. Please choose a different time.");
      return;
    }
  
    setEvents({
      ...events,
      [selectedDate]: [...dateEvents, eventDetails],
    });
  
    setEventDetails({ name: "", startTime: "", endTime: "", description: "" });
  };
  

  const handleEventDelete = (index) => {
    const dateEvents = events[selectedDate];
    dateEvents.splice(index, 1);
    setEvents({ ...events, [selectedDate]: [...dateEvents] });
  };
  const handleUpdateEvent = (date, updatedEvents) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [date]: updatedEvents,
    }));
  };

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const totalDays = daysInMonth(currentDate.getMonth(), currentDate.getFullYear());

  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
  const blankDays = Array.from({ length: firstDayOfMonth }, (_, i) => "");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-3/4">
        <CalendarHeader
          currentDate={currentDate}
          onPrevious={handlePreviousMonth}
          onNext={handleNextMonth}
        />
        <CalendarGrid
          days={daysArray}
          blankDays={blankDays}
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDayClick={handleDayClick}
        />
        <EventModal
          selectedDate={selectedDate}
          events={events}
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
          handleEventSubmit={handleEventSubmit}
        />
      </div>
      <EventList
        selectedDate={selectedDate}
        events={events}
        onDelete={handleEventDelete}
        onUpdate={handleUpdateEvent}
      />
    </div>
  );
};

export default App;