import { Button } from "./components/ui/button";

const CalendarHeader = ({ currentDate, onPrevious, onNext }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-2 sm:p-4 bg-gray-200">
      <Button variant="default" onClick={onPrevious} className="mb-2 sm:mb-0 sm:mr-4">
        Previous
      </Button>
      <h2 className="text-lg font-bold sm:text-2xl text-center mb-2 sm:mb-0">
        {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
      </h2>
      <Button variant="default" onClick={onNext} className="sm:ml-4">
        Next
      </Button>
    </div>
  );
};

export default CalendarHeader;

