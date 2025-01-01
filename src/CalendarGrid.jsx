import React from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = ({ days, blankDays, currentDate, selectedDate, onDayClick }) => {
  const today = new Date();

  return (
    <div className="grid grid-cols-7 gap-2 p-4 bg-white shadow-md rounded-lg">
      {daysOfWeek.map((day) => (
        <div
          key={day}
          className="text-center font-medium text-gray-800 uppercase bg-gray-100 py-2 rounded"
        >
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

        const isWeekend = (index % 7 === 0 || (index + 1) % 7 === 0) && day;

        const cellClasses = day
          ? `cursor-pointer border rounded-lg p-8 text-center font-semibold transition ${
              isToday
                ? "bg-blue-200 text-blue-900"
                : isSelected
                ? "bg-blue-400 text-white"
                : isWeekend
                ? "bg-red-100 text-red-700"
                : "hover:bg-gray-100"
            }`
          : "bg-gray-50";

        return (
          <div
            key={index}
            className={cellClasses}
            onClick={() => day && onDayClick(day)}
          >
            {day || ""}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
