import React from "react";
import { Button } from "./components/ui/button";


const EventList = ({ selectedDate, events, onDelete }) => {
  return (
    <div className="w-1/4 p-4 bg-gray-200">
      <h3 className="text-lg font-bold mb-4">Events on {selectedDate || "Select a day"}</h3>
      {selectedDate && (
        <ul className="space-y-2">
          {(events[selectedDate] || []).map((event, index) => (
            <li key={index} className="border p-2 rounded bg-white">
              <strong>{event.name}</strong>: {event.startTime} - {event.endTime}
              <p>{event.description}</p>
              <Button
                className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => onDelete(index)}
              >
                Delete
              </Button>
            </li>
          ))}
          {events[selectedDate]?.length === 0 && (
            <p className="text-gray-600">No events for this day.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default EventList;