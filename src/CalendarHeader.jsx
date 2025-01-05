import { Button } from "./components/ui/button";

const CalendarHeader = ({ currentDate, onPrevious, onNext }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-200">
      <Button variant="default" onClick={onPrevious}>
        Previous
      </Button>
      <h2 className="text-xl font-bold">
        {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
      </h2>
      <Button variant="default" onClick={onNext}>
        Next
      </Button>
    </div>
  );
};
export default CalendarHeader;