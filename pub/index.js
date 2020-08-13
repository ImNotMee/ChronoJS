let appointmentID = 0;
let appointments = [];

class Appointment {
  constructor(name, notes, start, end, type) {
    this.id = appointmentID;
    this.name = name;
    this.notes = notes;
    this.startTime = new Date(start);
    this.endTime = new Date(end);
    this.type = this.typeConverter(type);
    appointmentID ++;
  }

  typeConverter(type) {
    if (type === "urgent") {
      return "#ff6c61"
    }
    else if(type === "important") {
      return "#fff175"
    }
    else {
      return "#35d45f"
    }
  }
}

function removeAppointment(id) {
    let newAppointments = appointments.filter(app => app.id != id);
    return newAppointments;
}

function editAppointment(id, name, notes, startTime, endTime, type) {
  let t = appointments.filter(a => a.id === id);
  t.name = name;
  t.notes = notes;
  t.startTime = startTime;
  t.endTime = endTime;
  t.type = t.typeConverter(type);
  log("update completed");
}

const appAddForm = document.querySelector('#appAddForm');
appAddForm.addEventListener('submit', addAppointment);

function addAppointment(e) {
  e.preventDefault();
  const name = document.querySelector('#newAppName').value;
  const startD = document.querySelector('#newAppStartDate').value;
  const startT = document.querySelector('#newAppStartTime').value;
  const endD = document.querySelector('#newAppEndDate').value;
  const endT = document.querySelector('#newAppEndTime').value;
  const notes = document.querySelector('#newAppNotes').value;
  const selected = document.querySelector('#newAppType');
  const type = selected.options[selected.selectedIndex].value;

  const timeSlot = dateEntry(startD,startT,endD,endT);

  const app = new Appointment(name, notes, timeSlot[0], timeSlot[1], type);
  appointments.push(app);
  if (calen.month ===new Date(startD).getMonth()) {
    addNewAppointment(app);
  }
}

function dateEntry(startD, startT, endD, endT) {
  const start = new Date(startD+"T"+startT).toUTCString();
  const end = new Date(endD+"T"+endT).toUTCString();
  return [start, end];
}

function dateFormater(date) {
  const year = date.getFullYear();
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  let hours = String(date.getHours());
  let mins = String(date.getMinutes());
  if (hours.length === 1) {
    hours = "0" + hours;
  }
  if (mins.length === 1) {
    mins = "0" + mins;
  }
  const time = hours + ":" + mins;
  if (date.getHours() >= 12) {
    return(month + " " + day + " " + year +", " + time);
  } else {
    return(month + " " + day + " " + year +", " + time);
  }
}

const addNewAppointment = (app) => {
  const eventBox = document.getElementById("appointments");
  let eachBox = document.createElement("div");
  eachBox.id = "app";
  eachBox.innerHTML = "Event: " + app.name +
  "<br /> Start Time: " + dateFormater(app.startTime) +
  "<br /> End Time: " + dateFormater(app.endTime) + "<br /> Notes: " + app.notes;
  eachBox.style.backgroundColor = app.type;
  eventBox.appendChild(eachBox);

  // adding to calendar
  let elements = document.querySelectorAll('#dates');
  for (let n = 0; n < elements.length; n++) {
    let temp = elements[n].innerText;
    if (n >= 9) {
         temp = temp.substring(0,2);
    }
    else {
       temp = temp.substring(0,1);
    }
    if (parseInt(temp) == app.startTime.getDate()) {
        let appBox = document.createElement("div");
        appBox.id = "app";
        appBox.innerHTML = app.name.bold() + " - " + dateFormater(app.startTime) + "-" + dateFormater(app.endTime) +
        "<br /> Notes: " + app.notes;
        appBox.style.backgroundColor = app.type;
        elements[n].appendChild(appBox);
    }
  }
}
