import React from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = ({ days, blankDays, currentDate, selectedDate, onDayClick }) => {
  const today = new Date();
  
  return (
    <div className="grid grid-cols-7 gap-2 p-4 bg-white">
      {daysOfWeek.map((day) => (
        <div key={day} className="text-center font-medium text-gray-600">
          {day}
        </div>
      ))}
      {[...blankDays, ...days].map((day, index) => {
        const isToday =
          day === today.getDate() &&
          currentDate.getMonth() === today.getMonth() &&
          currentDate.getFullYear() === today.getFullYear();

        const isSelected =
          selectedDate === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

        return (
          <div
            key={index}
            className={`p-8 text-center border rounded cursor-pointer ${
              isToday ? "bg-blue-100" : ""
            } ${
              isSelected ? "bg-blue-300" : "hover:bg-gray-100"
            }`}
            onClick={() => day && onDayClick(day)}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
