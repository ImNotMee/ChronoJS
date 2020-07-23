import { Calendar } from "./calendar.js";

const appointments = [
  {  id: 0,
    name: "Doctor's Appointment",
    notes: "leave 16 mins early",
    startTime: new Date(2020,6, 16),
    endTime: new Date(2020,6, 16),
    type: "urgent"
  },
  {
    id: 1,
    name: "Family Dinner",
    notes: "buy gifts",
    startTime: new Date(2020,6, 11),
    endTime: new Date(2020, 6,11),
    type: "important"
  },
  {
    id: 2,
    name: "Meeting with Friends",
    notes: "Playing Pool",
    startTime: new Date(2020,5, 11),
    endTime: new Date(2020, 5,11),
    type: "notImportant"
  }
];

const calendar = new Calendar(2020, 6);
startCalendar(calendar);
