import React, { useState, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import EventList from "./EventList";

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
        <div className="p-4">
          {selectedDate && (
            <form onSubmit={handleEventSubmit} className="space-y-4 bg-white p-4 rounded shadow-md">
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Event Name"
                value={eventDetails.name}
                onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
                required
              />
              <div className="flex space-x-4">
                <input
                  type="time"
                  className="w-1/2 p-2 border rounded"
                  value={eventDetails.startTime}
                  onChange={(e) => setEventDetails({ ...eventDetails, startTime: e.target.value })}
                  required
                />
                <input
                  type="time"
                  className="w-1/2 p-2 border rounded"
                  value={eventDetails.endTime}
                  onChange={(e) => setEventDetails({ ...eventDetails, endTime: e.target.value })}
                  required
                />
              </div>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Description (optional)"
                value={eventDetails.description}
                onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
              ></textarea>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Add Event
              </button>
            </form>
          )}
        </div>
      </div>
      <EventList selectedDate={selectedDate} events={events} onDelete={handleEventDelete} />
    </div>
  );
};

export default App;