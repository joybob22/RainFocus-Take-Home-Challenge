import { useEffect, useState } from "react";
import EventController from "../../controllers/EventController";
import RFEvent from "../../models/RFEvent";
import { toast } from "react-toastify";
import EventRow from "../EventRow/EventRow";
import "./allEvents.css";
import { Link } from "react-router-dom";

export default function AllEvents() {
  const [events, setEvents] = useState<RFEvent[]>([]);

  useEffect(() => {
    EventController.fetchEvents()
      .then((events: RFEvent[]) => {
        setEvents(events);
      })
      .catch((error) => {
        toast.error(
          "Error retrieving your events. Please reload the page or try again later."
        );
      });
  }, [events]);

  return (
    <div className="App">
      <div className="app-header">
        <h1>All Events</h1>
        <Link to="/add-event">
          <div className="add-event-button">Add Event</div>
        </Link>
      </div>
      <div className="event-headers">
        <div>Name</div>
        <div>Company</div>
        <div>Description</div>
      </div>
      {events.map((event: RFEvent) => (
        <EventRow key={event.id} event={event} />
      ))}
    </div>
  );
}
