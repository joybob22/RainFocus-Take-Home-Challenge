import axios, { AxiosResponse } from "axios";
import RFEvent from "../models/RFEvent";
import $ from "jquery";

class EventController {
  private static baseUrl: string =
    "https://rf-json-server.herokuapp.com/events-3";
  private static events: RFEvent[] = [];

  static async fetchEvents(): Promise<RFEvent[]> {
    if (this.events.length > 0) {
      return this.events;
    }

    // Events have not been loaded in yet
    // Load them from the server

    let response: AxiosResponse = await axios({
      method: "get",
      url: this.baseUrl,
    });
    let events: RFEvent[] = response.data;

    // Sort events by company name
    this.events = events.sort((a, b) => (a.company < b.company ? -1 : 1));
    return this.events;
  }

  static async fetchEvent(id: string): Promise<RFEvent> {
    let event = this.events.find((ev) => ev.id == id);

    if (event) {
      // No event found, try fetching for it individually at the endpoint
      event = await this.fetchEventFromAPI(id);
    }

    return event
      ? event
      : Promise.reject(new Error("No event by the given id"));
  }

  private static async fetchEventFromAPI(id: String): Promise<RFEvent> {
    let response: AxiosResponse = await axios({
      method: "get",
      url: `${this.baseUrl}/${id}`,
    });
    const event: RFEvent = response.data;
    return event;
  }

  static async saveNewEvent(event: RFEvent): Promise<RFEvent> {
    event.createdOn = new Date();
    console.log(JSON.stringify(event));
    // await axios
    //   .post(this.baseUrl, JSON.stringify(event), {
    //     headers: { "Content-Type": "application/json" },
    //   })
    //   .then((res: AxiosResponse) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // await axios({
    //   method: "POST",
    //   url: this.baseUrl,
    //   data: JSON.stringify(event),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log("making request");
    console.log({ body: JSON.stringify(event) });
    console.log("another one");
    // let res = await fetch(this.baseUrl, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: new BodyInit(""),
    // });
    $.ajax({
      type: "POST",
      url: this.baseUrl,
      data: event,
      beforeSend: (req) => {
        req.setRequestHeader("Content-Type", "application/json");
      },
      success: () => {
        console.log("did it");
      },
      error: (err) => {
        console.log(err);
      },
    });
    // let result = await res.json();
    console.log(result);
    console.log("here");
    this.events.push(event);
    return event;
  }

  static async updateExistingEvent(event: RFEvent): Promise<RFEvent> {
    await axios({
      method: "put",
      url: `${this.baseUrl}/${event.id}`,
      data: JSON.stringify(event),
    });
    this.events = this.events.map((ev) => (event.id == ev.id ? event : ev));
    return event;
  }

  static async deleteEvent(id: string | undefined): Promise<boolean> {
    await axios({
      method: "delete",
      url: `${this.baseUrl}/${id}`,
    });

    this.events = this.events.filter((ev) => ev.id != id);
    return true;
  }
}

export default EventController;
