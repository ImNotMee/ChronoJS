const apps = [
  {  id: 0,
    name: "Doctor's Appointment",
    notes: "leave 16 mins early",
    startTime: new Date(2020,7, 16, 11,0),
    endTime: new Date(2020,7, 16, 12, 30),
    type: "urgent"
  },
  {
    id: 1,
    name: "Family Dinner",
    notes: "buy gifts",
    startTime: new Date(2020,7, 11,18,0),
    endTime: new Date(2020, 7,11,21, 30),
    type: "important"
  },
  {
    id: 2,
    name: "Meeting with Friends",
    notes: "Playing Pool",
    startTime: new Date(2020,5, 1),
    endTime: new Date(2020, 5,1),
    type: "important"
  },
  {
    id: 3,
    name: "Final Exam",
    notes: "",
    startTime: new Date(2020,6, 11, 3, 20, 0),
    endTime: new Date(2020, 6,11, 7, 30, 0),
    type: "important"
  },
  {
    id: 4,
    name: "enjoying the sun",
    notes: "hiking",
    startTime: new Date(2020,7, 28, 10, 0),
    endTime: new Date(2020, 7,28,17,0),
    type: "notImportant"
  },
  {
    id: 5,
    name: "Pick Up Kids from class",
    notes: "",
    startTime: new Date(2020,8, 1, 18, 0),
    endTime: new Date(2020, 8, 1, 18, 0),
    type: "urgent"
  }
];
const cMonth = 7;
const cyear = 2020;
const calen = new Calendar(cyear, cMonth);
calen.loadAppointments(apps);
calen.startCalendar();
