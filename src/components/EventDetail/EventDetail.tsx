import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EventController from "../../controllers/EventController";
import RFEvent from "../../models/RFEvent";

export default function EventDetail() {
  const emptyEvent = new RFEvent(
    "",
    false,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    new Date()
  );
  const [event, setEvent] = useState<RFEvent>(emptyEvent);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      EventController.fetchEvent(id)
        .then((ev) => {
          setEvent(ev);
        })
        .catch((err) => {
          toast.error("No event by the given id");
          navigate("/");
        });
    }
  }, [id]);

  function handleDelete() {
    EventController.deleteEvent(event.id)
      .then((res) => {
        toast.success("Event Deleted Succesfully");
        // navigate("/");
      })
      .catch((err) => {
        toast.error("Unable to delete event");
      });
  }

  // function handleEditButtonClick() {
  //   navigate
  // }

  return (
    <>
      <div>Event Name: {event.name}</div>
      <div>Event Company: {event.company} </div>
      <div
        onClick={() => {
          handleDelete();
        }}
      >
        Delete
      </div>
      <Link to={`/edit-event/${event.id}`}>Edit</Link>
    </>
  );
}
