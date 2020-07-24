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

const appAddForm = document.querySelector('#appAddForm');
appAddForm.addEventListener('submit', addAppointment);

function addAppointment(e) {
  e.preventDefault();
  const name = document.querySelector('#newAppName').value;
  const start = document.querySelector('#newAppStartTime').value;
  const end = document.querySelector('#newAppEndTime').value;
  const notes = document.querySelector('#newAppNotes').value;
  const selected = document.querySelector('#newAppType');
  const type = selected.options[selected.selectedIndex].value;

  const app = new Appointment(name, notes, start, end, type);
  appointments.push(app);
  addNewAppointment(app);
}

function dateFormater(date) {
  const year = date.getFullYear();
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const time = date.getHours() + ":" +date.getMinutes();
  if (date.getHours() >= 12) {
    return(month + " " + day + " " + year +", " + time +"PM");
  } else {
    return(month + " " + day + " " + year +", " + time + "AM");
  }
}

const addNewAppointment = (app) => {
  // clearing old appointments
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
      if (elements[n].firstChild.nodeValue == app.startTime.getDate()) {
        let appBox = document.createElement("div");
        appBox.id = "app";
        appBox.innerHTML = app.name.bold() + " - " + dateFormater(app.startTime) + "-" + dateFormater(app.endTime) +
        "<br /> Notes: " + app.notes;
        appBox.style.backgroundColor = app.type;
        elements[n].appendChild(appBox);
    }
  }
}

// Settings
const themeForm = document.querySelector('#themeOptions');
themeForm.addEventListener('submit', changeTheme);

function changeTheme(e) {
  e.preventDefault();
  const selected = document.querySelector('#theme');
  const theme = selected.options[selected.selectedIndex].value;
  const calBody = document.querySelector('#calendarBody');
  if (theme === "light") {
    calBody.style.backgroundColor = '#ffffff';
    calBody.style.color = '#000000';
  }
  else if (theme === "dark") {
    calBody.style.backgroundColor = '#2c2c2c';
    calBody.style.color = '#ffffff';
  }
  else if(theme === "gradient") {
  }
}
