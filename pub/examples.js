const apps = [
  {  id: 0,
    name: "Doctor's Appointment",
    notes: "leave 16 mins early",
    startTime: new Date(2020,6, 16),
    endTime: new Date(2020,6, 16),
    type: "#ff6c61"
  },
  {
    id: 1,
    name: "Family Dinner",
    notes: "buy gifts",
    startTime: new Date(2020,6, 11),
    endTime: new Date(2020, 6,11),
    type: "#fff175"
  },
  {
    id: 2,
    name: "Meeting with Friends",
    notes: "Playing Pool",
    startTime: new Date(2020,5, 11),
    endTime: new Date(2020, 5,11),
    type: "#35d45f"
  },
  {
    id: 3,
    name: "Final Exam",
    notes: "",
    startTime: new Date(2020,5, 11, 3, 20, 0),
    endTime: new Date(2020, 5,11, 7, 30, 0),
    type: "#fff175"
  },
  {
    id: 4,
    name: "enjoying the sun",
    notes: "hiking",
    startTime: new Date(2020,6, 28, 10, 0),
    endTime: new Date(2020, 6,28,17,0),
    type: "#35d45f"
  },
  {
    id: 5,
    name: "Pick Up Kids from class",
    notes: "",
    startTime: new Date(2020,8, 1, 18, 0),
    endTime: new Date(2020, 8, 1, 18, 0),
    type: "#ff6c61"
  }
];
const cMonth = 6;
const cyear = 2020;
const calen = new Calendar(cyear, cMonth);
calen.loadAppointments(apps);
calen.startCalendar();
