import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const EventModal = ({ selectedDate, events, eventDetails, setEventDetails, handleEventSubmit }) => {
  return (
    <div className="p-4">
      {selectedDate && (
        <form onSubmit={handleEventSubmit} className="space-y-4 bg-white p-4 rounded shadow-md">
          <Input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Event Name"
            value={eventDetails.name}
            onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
            required
          />
          <div className="flex space-x-4">
            <Input
              type="time"
              className="w-1/2 p-2 border rounded"
              value={eventDetails.startTime}
              onChange={(e) => setEventDetails({ ...eventDetails, startTime: e.target.value })}
              required
            />
            <Input
              type="time"
              className="w-1/2 p-2 border rounded"
              value={eventDetails.endTime}
              onChange={(e) => setEventDetails({ ...eventDetails, endTime: e.target.value })}
              required
            />
          </div>
          <Textarea
            className="w-full p-2 border rounded"
            placeholder="Description (optional)"
            value={eventDetails.description}
            onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
          ></Textarea>
          <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Add Event
          </Button>
        </form>
      )}
    </div>
  );
};

export default EventModal;