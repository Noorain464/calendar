import { Button } from "./components/ui/button";

const CalendarHeader = ({ currentDate, onPrevious, onNext }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-200 md:p-6">
      <Button variant="default" onClick={onPrevious} className="mb-4 md:mb-0 md:mr-4">
        Previous
      </Button>
      <h2 className="text-xl font-bold md:text-2xl">
        {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
      </h2>
      <Button variant="default" onClick={onNext} className="md:ml-4">
        Next
      </Button>
    </div>
  );
};
export default CalendarHeader;
