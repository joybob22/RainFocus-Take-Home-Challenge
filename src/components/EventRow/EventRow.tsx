import "./EventRow.css";
import RFEvent from "../../models/RFEvent";
import { Link } from "react-router-dom";

export default function EventRow({ event }: { event: RFEvent }) {
  return (
    <Link to={`event-detail/${event.id}`}>
      <div className="event-row">
        <div>{event.name}</div>
        <div>{event.company}</div>
        <div>{event.description}</div>
      </div>
    </Link>
  );
}
