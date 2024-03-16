import RFEvent from "../../models/RFEvent";
import React, { useEffect, useState } from "react";
import "../../StringExtensions";
import "./AddEditEvent.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import EventController from "../../controllers/EventController";

export default function AddEditEvent({
  saveEvent,
}: {
  saveEvent: (event: RFEvent) => Promise<RFEvent>;
}) {
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
  const testEvent = new RFEvent(
    "red",
    true,
    "test",
    "1111-11-11",
    "11:11",
    "test company",
    "test@test.com",
    "+1 (123) 123-1234",
    "test address",
    "This is a description",
    "https://mtec.edu/wp-content/uploads/2023/01/MTECH-Seal-Maroon-1024x1024.png",
    new Date()
  );
  const [event, setEvent] = useState<RFEvent>(testEvent);
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
          navigateBack();
        });
    }
  }, [id]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setEvent((prevFormData) => ({
      ...prevFormData,
      [name]: name == "isActive" ? event.target.checked : value,
    }));
  }

  async function handleSubmit() {
    console.log("submit");
    // Validate inputs
    // Color
    let colorCheck = new Option().style;
    colorCheck.color = event.color;
    if (colorCheck.color != event.color || event.color == "") {
      console.log("error in color");
      toast.error("Invalid color name. Please use a web safe color.");
      return;
    }
    console.log("made it");
    // Date
    const dateRE = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRE.test(event.date)) {
      console.log("error in date");
      toast.error("Invalid date format. Should be XXXX-XX-XX. Ex: 2021-01-05");
      return;
    }

    // Time
    const timeRE = /^\d{2}:\d{2}$/;
    if (!timeRE.test(event.time)) {
      toast.error("Invalid time format. Should be XX:XX. Ex: 6:56");
      return;
    }

    // Email
    const emailRE = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRE.test(event.email)) {
      toast.error("Invalid email.");
      return;
    }

    // Phone
    const phoneRE =
      /^[+]{1}(?:[0-9\-\(\)\/\.]\s?)(?:[0-9\-\(\)\/\.]\s?)(?:[0-9\-\(\)\/\.]\s?)(?:[0-9\-\(\)\/\.]\s?)(?:[0-9\-\(\)\/\.]\s?)(?:[0-9\-\(\)\/\.]\s?)(?:[0-9\-\(\)\/\.]\s?)?(?:[0-9\-\(\)\/\.]\s?)?(?:[0-9\-\(\)\/\.]\s?)?(?:[0-9\-\(\)\/\.]\s?)?(?:[0-9\-\(\)\/\.]\s?)?(?:[0-9\-\(\)\/\.]\s?)?(?:[0-9\-\(\)\/\.]\s?)?(?:[0-9\-\(\)\/\.]\s?)?(?:[0-9\-\(\)\/\.]\s?)?[0-9]{1}$/;
    if (!phoneRE.test(event.phone)) {
      toast.error(
        "Invalid phone number. Format should be +X (XXX) XXX-XXXX or other international format."
      );
      return;
    }

    // ImageURL
    const imageUrlRE =
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
    if (!imageUrlRE.test(event.image)) {
      toast.error("Invalid image URL.");
      return;
    }

    // String inputs
    if (
      event.name.trim().length == 0 ||
      event.company.trim().length == 0 ||
      event.address.trim().length == 0 ||
      event.description.trim().length == 0
    ) {
      toast.error("All inputs must have a value");
      return;
    }

    // Good inputs
    // setEvent((prevEvent) => ({
    //   ...prevEvent,
    //   ["createdOn"]: new Date(),
    // }));

    saveEvent(event)
      .then((res) => {
        // success, navigate back
        toast.success("Success");
        navigateBack();
      })
      .catch((err) => {
        // invalid input or saving error
        toast.error(err);
      });
  }

  function navigateBack() {
    navigate(id ? "/event/:id" : "/");
  }

  return (
    <div className="App event-form">
      <h1>{id ? "Edit" : "Add"} Event</h1>
      {Object.keys(event).map((key: string) =>
        key == "id" || key == "createdOn" ? null : (
          <div className="input-container" key={key}>
            <div>{key.captilizeFirstLetter()}: </div>
            {key == "isActive" ? (
              <input
                type="checkbox"
                name={key}
                placeholder={key.captilizeFirstLetter()}
                onChange={handleChange}
                checked={event[key]}
              />
            ) : (
              <input
                type="text"
                name={key}
                placeholder={key.captilizeFirstLetter()}
                onChange={handleChange}
                value={event[key]}
              />
            )}
          </div>
        )
      )}
      <div className="form-buttons">
        <div
          className="cancel-button"
          onClick={() => {
            navigateBack();
          }}
        >
          Cancel
        </div>
        <div
          className="submit-button"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
