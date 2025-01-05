import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

const EventList = ({ selectedDate, events, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editDetails, setEditDetails] = useState({
    name: "",
    startTime: "",
    endTime: "",
    description: "",
    category: "other",
  });
  const [filterKeyword, setFilterKeyword] = useState("");

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditDetails(events[selectedDate][index]);
    setIsEditing(true);
  };

  const handleUpdate = () => {
    const updatedEvents = [...events[selectedDate]];
    updatedEvents[editIndex] = editDetails;
    onUpdate(selectedDate, updatedEvents);
    setIsEditing(false);
    setEditIndex(null);
  };

  const filteredEvents =
    events[selectedDate]?.filter((event) =>
      event.name.toLowerCase().includes(filterKeyword.toLowerCase())
    ) || [];

  const getCategoryColor = (category) => {
    switch (category) {
      case "work":
        return "bg-blue-200";
      case "personal":
        return "bg-green-200";
      case "other":
        return "bg-gray-200";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="flex flex-col w-full md:w-1/4 p-4 md:p-6">
      <h3 className="text-lg font-bold mb-4 md:mb-6">
        Events on {selectedDate || "Select a day"}
      </h3>

      {selectedDate && (
        <Input
          type="text"
          placeholder="Filter events by keyword"
          className="mb-4 md:mb-6 w-full"
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
        />
      )}

      {selectedDate && (
        <ul className="space-y-2 md:space-y-4">
          {filteredEvents.map((event, index) => (
            <li
              key={index}
              className={`border md:border-2 p-4 md:p-6 rounded ${getCategoryColor(
                event.category
              )}`}
            >
              <strong>{event.name}</strong>: {event.startTime} - {event.endTime}
              <p className="pt-2 pb-4 md:pt-4 md:pb-6">{event.description}</p>
              <div className="flex space-x-2 md:flex-row flex-col md:space-x-4 space-y-2 md:space-y-0">
                <Button
                  className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => onDelete(index)}
                >
                  Delete
                </Button>
                <Button
                  className="mt-2 px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </Button>
              </div>
            </li>
          ))}
          {filteredEvents.length === 0 && (
            <p className="text-gray-600">No events match the keyword.</p>
          )}
        </ul>
      )}

      {isEditing && (
        <div className="mt-4 p-4 md:p-6 bg-white border md:border-2 rounded">
          <h4 className="text-lg font-bold mb-2 md:mb-4">Edit Event</h4>
          <Input
            type="text"
            placeholder="Event Name"
            className="w-full mb-2 md:mb-4"
            value={editDetails.name}
            onChange={(e) =>
              setEditDetails({ ...editDetails, name: e.target.value })
            }
          />
          <div className="flex space-x-2 md:flex-row flex-col md:space-x-4 space-y-2 md:space-y-0 mb-2 md:mb-4">
            <Input
              type="time"
              className="w-1/2"
              value={editDetails.startTime}
              onChange={(e) =>
                setEditDetails({ ...editDetails, startTime: e.target.value })
              }
            />
            <Input
              type="time"
              className="w-1/2"
              value={editDetails.endTime}
              onChange={(e) =>
                setEditDetails({ ...editDetails, endTime: e.target.value })
              }
            />
          </div>
          <Textarea
            placeholder="Description"
            className="w-full mb-2 md:mb-4"
            value={editDetails.description}
            onChange={(e) =>
              setEditDetails({ ...editDetails, description: e.target.value })
            }
          />
          <div className="flex space-x-2 md:flex-row flex-col md:space-x-4 space-y-2 md:space-y-0">
            <Button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleUpdate}
            >
              Save
            </Button>
            <Button
              className="px-4 py-2 bg-gray-400 text-white rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;

