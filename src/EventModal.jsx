import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const EventModal = ({ selectedDate, events, eventDetails, setEventDetails, onSubmit, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h3 className="text-lg font-bold mb-4">Events on {selectedDate}</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            placeholder="Event Name"
            value={eventDetails.name}
            onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
            required
          />
          <div className="flex space-x-4">
            <Input
              type="time"
              value={eventDetails.startTime}
              onChange={(e) => setEventDetails({ ...eventDetails, startTime: e.target.value })}
              required
            />
            <Input
              type="time"
              value={eventDetails.endTime}
              onChange={(e) => setEventDetails({ ...eventDetails, endTime: e.target.value })}
              required
            />
          </div>
          <Textarea
            placeholder="Description (optional)"
            value={eventDetails.description}
            onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
          ></Textarea>
          <div className="flex space-x-4">
            <Button type="submit" variant="default">
              Add Event
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </form>
        <ul className="mt-4 space-y-2">
          {events[selectedDate]?.map((event, index) => (
            <li key={index} className="border p-2 rounded">
              <strong>{event.name}</strong>: {event.startTime} - {event.endTime}
              <p>{event.description}</p>
              <Button variant="destructive" className="mt-2" onClick={() => onDelete(index)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventModal;