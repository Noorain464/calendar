import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";

const EventModal = ({
  selectedDate,
  events,
  eventDetails,
  setEventDetails,
  handleEventSubmit,
}) => {
  return (
    <div className="p-4 md:p-6">
      {selectedDate && (
        <form
          onSubmit={handleEventSubmit}
          className="space-y-4 bg-white p-4 rounded shadow-md md:w-1/2 md:mx-auto"
        >
          <Input
            type="text"
            className="w-full p-2 border rounded block md:w-64"
            placeholder="Event Name"
            value={eventDetails.name}
            onChange={(e) =>
              setEventDetails({ ...eventDetails, name: e.target.value })
            }
            required
          />
          <div className="flex space-x-4 md:flex-col md:space-x-0 md:space-y-4">
            <Input
              type="time"
              className="w-1/2 p-2 border rounded block md:w-full"
              value={eventDetails.startTime}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, startTime: e.target.value })
              }
              required
            />
            <Input
              type="time"
              className="w-1/2 p-2 border rounded block md:w-full"
              value={eventDetails.endTime}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, endTime: e.target.value })
              }
              required
            />
          </div>
          <Textarea
            className="w-full p-2 border rounded block md:w-64"
            placeholder="Description (optional)"
            value={eventDetails.description}
            onChange={(e) =>
              setEventDetails({ ...eventDetails, description: e.target.value })
            }
          ></Textarea>
          {/* Add category selection dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Event Category
            </label>
            <select
              className="w-full p-2 border rounded block md:w-64"
              value={eventDetails.category || "other"}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, category: e.target.value })
              }
              required
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded block md:w-64 md:mx-auto"
          >
            Add Event
          </Button>
        </form>
      )}
    </div>
  );
};

export default EventModal;

