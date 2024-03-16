import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AddEditEvent from "./components/AddEditEvent/AddEditEvent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EventController from "./controllers/EventController";
import EventDetail from "./components/EventDetail/EventDetail";
import axios from "axios";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/event-detail/:id",
    element: <EventDetail />,
  },
  {
    path: "/add-event",
    element: <AddEditEvent saveEvent={EventController.saveNewEvent} />,
  },
  {
    path: "/edit-event/:id",
    element: <AddEditEvent saveEvent={EventController.updateExistingEvent} />,
  },
]);

axios.defaults.headers.common["Content-Type"] = "application/json";

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
