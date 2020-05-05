import _ from "lodash";
import {
  CREATE_EVENT,
  READ_EVENTS,
  READ_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from "../actions";

export default (events = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT:
    case READ_EVENT:
    case UPDATE_EVENT:
      const data = action.response;
      const key = data._id;
      return { ...events, [key]: data };
    case READ_EVENTS:
      //[
      //  {id: 1, title: "Let's have an event 1!", body: "This is the body for event 1."},
      //  {id: 2, title: "Let's have an event 2!", body: "This is the body for event 2."}
      //]
      return _.mapKeys(action.response.data, "_id");
    case DELETE_EVENT:
      delete events[action.id];
      return { ...events };
    default:
      return events;
  }
};
