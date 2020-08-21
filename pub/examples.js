const apps = [
  {
    name: "Doctor's Appointment",
    notes: "Leave 16 mins early",
    startTime: new Date(2020, 7, 16, 11, 0),
    endTime: new Date(2020, 7, 16, 12, 30),
    type: "urgent"
  },
  {
    name: "Family Dinner",
    notes: "Buy gifts",
    startTime: new Date(2020, 7, 11, 18, 0),
    endTime: new Date(2020, 7, 11, 21, 30),
    type: "important"
  },
  {
    name: "Meeting with Friends",
    notes: "",
    startTime: new Date(2020,5, 1),
    endTime: new Date(2020, 5, 1),
    type: "important"
  },
  {
    name: "Final Exam",
    notes: "CSC108",
    startTime: new Date(2020,6, 11, 3, 20, 0),
    endTime: new Date(2020, 6, 11, 7, 30, 0),
    type: "important"
  },
  {
    name: "Enjoying the sun",
    notes: "",
    startTime: new Date(2020, 7, 28, 10, 0),
    endTime: new Date(2020, 7, 28, 17, 0),
    type: "notImportant"
  },
  {
    name: "Pick Up Kids from class",
    notes: "ASAP",
    startTime: new Date(2020,8, 1, 18, 0),
    endTime: new Date(2020, 8, 1, 18, 30),
    type: "urgent"
  },
  {
    name: "Buying a lamp at Ikea",
    notes: "If I have time",
    startTime: new Date(2020,4, 1, 18, 10, 30),
    endTime: new Date(2020, 4, 1, 18, 14, 20),
    type: "notImportant"
  },
  {
    name: "Shopping for new computer",
    notes: "",
    startTime: new Date(2020,8, 13, 14, 0),
    endTime: new Date(2020, 8, 13, 18, 15),
    type: "important"
  },
  {
    name: "Sign up for courses",
    notes: "On Acorn",
    startTime: new Date(2020,7, 11, 8, 10),
    endTime: new Date(2020, 7, 11, 8, 40),
    type: "urgent"
  },
  {
    name: "Sleep",
    notes: "AT HOME",
    startTime: new Date(2020,7, 1, 1, 10),
    endTime: new Date(2020, 7, 1, 1, 10),
    type: "urgent"
  },
];

const cMonth = 7;
const cyear = 2020;
const calen = new Calendar(cyear, cMonth);
calen.loadAppointments(apps);
calen.startCalendar();
