const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let today = {year: 2020, month: 6};

class Calendar {
  constructor(year, month) {
    this.theme = [];
    this.year = year;
    this.month = month;
    this.appointments = getAppointments(month);
  }
}

startCalendar = () => {
  let calendar = new Calendar(2020, 6);
  renderCalendar(calendar);
}


const getMonthData = (calendar) => {
  let d = new Date();
  const firstDay = new Date(calendar.year, calendar.month, 1);
  const numOfDays = new Date(calendar.year, calendar.month, 0);
  // first element is the month (in a num), second is the number of days in this month
  return [firstDay.getDay(), numOfDays.getDate()];
};

const getMonth = () => {
  let d = new Date();
  return d.getMonth();
};

const renderCalendar = (calendar) => {
  // For setting up the grid based on month
  renderMonth(MONTHS[calendar.month], calendar);
  renderDates(calendar);
  addThisMonthAppointments(calendar.month);
}

const sortingAppointments = (apps) => {
  let sorted = apps;
  apps.sort((appA, appB) => {
    const timeA = new Date(appA.startTime);
    const timeB = new Date(appB.startTime);

    return (timeA === timeB) ? 0 : (timeA > timeB) ? 1 : -1;
  })
  return sorted;
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
    },
    {
      id: 2,
      eventName: "asda",
      notes: "s",
      startTime: new Date(2020,5, 11),
      endTime: new Date(2020, 5,11),
      type: "#35d45f"
    }
  ];
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

const updateCalender = (calendar) => {
  const currMonthData = getMonthData(calendar);
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
  addThisMonthAppointments(calendar.month);
}

const renderDates = (calendar) => {
  const currMonthData = getMonthData(calendar);
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

const renderMonth = (currMonth, calendar) => {
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
  const newCal = new Calendar(today.year, today.month);
  updateCalender(newCal);
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
  const newCal = new Calendar(today.year, today.month);
  updateCalender(newCal);
};

startCalendar();
