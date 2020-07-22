const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let today = {year:2020, month: 6};
let appointmentID = 0;

class Calendar {
  constructor(year, month) {
    this.appointments = [];
    this.theme = [];
    this.year = year;
    this.month = month;
  }
}

class Appointment {
  constructor(name, notes, type) {
    this.id = appointmentID;
    this.name = name;
    this.notes = notes;
    this.startTime = new Date();
    this.endTime = new Date();
    this.type = type;
    appointmentID ++;
  }
}

startCalendar = () => {
  let curr = new Date();
  const calendar = new Calendar(2020, 6);
}




const getMonthData = () => {
  let d = new Date();
  const firstDay = new Date(today.year, today.month, 1);
  const numOfDays = new Date(today.year, today.month, 0);
  // first element is the month (in a num), second is the number of days in this month
  return [firstDay.getDay(), numOfDays.getDate()];
};

const getMonth = () => {
  let d = new Date();
  return d.getMonth();
};

const renderCalendar = () => {
  // For setting up the grid based on month
  renderMonth(MONTHS[today.month]);
  renderDates();
  addThisMonthAppointments(today.month);
}

const getAppointments = (month) => {
  let appointments = [
    {  id: 0,
      eventName: "test 1",
      notes: "asda",
      startTime: new Date(2020,6, 1),
      endTime: new Date(2020,6, 1),
      type: "#fff175"
    },
    {
      id: 1,
      eventName: "asda",
      notes: "s",
      startTime: new Date(2020,6, 11),
      endTime: new Date(2020, 6,11),
      type: "#35d45f"
    }];
  let t = appointments.filter(app => app.startTime.getMonth() === month);
  return t;
}

function dateFormater(date) {
  const year = date.getFullYear();
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const time = date.getHours() + ":" +date.getMinutes();
  return(month + " " + day + " " + year +", " + time);
}


const addThisMonthAppointments = (month) => {
  // clearing old appointments
  const eventBox = document.getElementById("appointments");
  while (eventBox.firstChild) {
    eventBox.removeChild(eventBox.lastChild);
  }

  const app = getAppointments(month);
  // adding to the event list
  app.forEach(a => {
      let eachBox = document.createElement("div");
      eachBox.id = "app";
      eachBox.innerHTML = "Event: " + a.eventName +
      "<br /> Start Time: " + dateFormater(a.startTime) +
      "<br /> End Time: " + dateFormater(a.endTime) + "<br /> Notes: " + a.notes;
      eachBox.style.backgroundColor = a.type;
      eventBox.appendChild(eachBox);
  });

  // adding to celendar
  let elements = document.querySelectorAll('#dates');
  for (let n = 0; n < elements.length; n++) {
    for (let i = 0; i < app.length; i++) {
      if (elements[n].innerHTML == app[i].startTime.getDate()) {
        let appBox = document.createElement("div");
        appBox.id = "app";
        appBox.innerHTML = "Event: " + app[i].eventName +
        "<br /> Start Time: " + dateFormater(app[i].startTime) +
        "<br /> End Time: " + dateFormater(app[i].endTime) +
        "<br /> Notes: " + app[i].notes;
        appBox.style.backgroundColor = app[i].type;
        elements[n].appendChild(appBox);
      }
    }
  }
}

const updateCalender = () => {
  const currMonthData = getMonthData();
  let date = 1;
  let temp = 0;
  let elements = document.querySelectorAll('#dates');
  elements.forEach(ele => {
    if (temp >= currMonthData[0] && date <= currMonthData[1]) {
        ele.innerHTML = date;
       date ++;
    } else {
      ele.innerHTML = "";
    }
    temp ++;
  })
  addThisMonthAppointments(today.month);
}

const renderDates = () => {
  const currMonthData = getMonthData();
  let date = 1;
  let temp = 0;
  let calBody = document.getElementById("container");
  for (let n = 0; n < 5; n ++) {
    let calBox = document.createElement("div");
    calBox.id = "calendarRow";
    for (let i = 0; i < 7; i++) {
       let eachBox = document.createElement("div");
       eachBox.id = "dates";
       let calText = document.createTextNode("");
       if (temp >= currMonthData[0] && date <= currMonthData[1]) {
          calText = document.createTextNode(date);
          date ++;
       }
       eachBox.appendChild(calText);
       calBox.appendChild(eachBox);
       temp ++;
    }
    calBody.appendChild(calBox);
  }
}

const renderMonth = (currMonth) => {
  let month = document.getElementById("month");
  month.innerHTML = currMonth +" " + today.year;
}

const nextMonth = () => {
  if (today.month != 11) {
    renderMonth(MONTHS[today.month + 1]);
    today.month = today.month + 1;
  } else {
      renderMonth(MONTHS[0]);
      today.month = 0;
      today.year = today.year + 1;
  }
  updateCalender();
};

const prevMonth = () => {
  if (today.month != 0) {
    renderMonth(MONTHS[today.month - 1]);
    today.month = today.month - 1;
  } else {
    renderMonth(MONTHS[11]);
    today.year = today.year - 1;
    today.month = 11;
  }
  updateCalender();
};

renderCalendar();
