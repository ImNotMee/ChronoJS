const log = console.log
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let today = {year: 2020, month: 6};

 class Calendar {
  constructor(year, month) {
    this.theme = "light";
    this.year = year;
    this.month = month;
    this.appointments = [];
  }
}

function startCalendar() {
  let calendar = new Calendar(2020, 6);
  renderCalendar(calendar);
}

function loadAppointments() {
  let appointments = [
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
	return appointments;
}


const getMonthData = (calendar) => {
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
  renderMonth(calendar);
  renderDates(calendar);
  addThisMonthAppointments(calendar);
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

const getAppointments = (calendar) => {
  let appointments = loadAppointments();
  let t = appointments.filter(app => app.startTime.getMonth() === calendar.month);
  return t;
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


const addThisMonthAppointments = (calendar) => {
  // clearing old appointments
  const eventBox = document.getElementById("appointments");
  while (eventBox.firstChild) {
    eventBox.removeChild(eventBox.lastChild);
  }

  let app = getAppointments(calendar);
  app = sortingAppointments(app);
  // adding to the event list
  app.forEach(a => {
      let eachBox = document.createElement("div");
      eachBox.id = "app";
      eachBox.innerHTML = a.name.bold() + " " + dateFormater(a.startTime) + "-" + dateFormater(a.endTime) +
      "<br /> Notes: " + a.notes;
      eachBox.style.backgroundColor = a.type;
      eventBox.appendChild(eachBox);
  });

  // adding to celendar
  let elements = document.querySelectorAll('#dates');
  for (let n = 0; n < elements.length; n++) {
    for (let i = 0; i < app.length; i++) {
      if (elements[n].innerText == app[i].startTime.getDate()) {
        let appBox = document.createElement("div");
        appBox.id = "app";
        appBox.innerHTML = app[i].name.bold() + " " + dateFormater(app[i].startTime) + "-" + dateFormater(app[i].endTime) +
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
  addThisMonthAppointments(calendar);
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

const renderMonth = (calendar) => {
  const monthDiv = document.getElementById("month");
  if(monthDiv != null) {
    monthDiv.innerText = MONTHS[calendar.month] +" " + calendar.year;
  }
}

const nextMonth = () => {
  const currMonthYear = document.getElementById("month");
  let temp = currMonthYear.innerText.split(" ");
  const cal = new Calendar(parseInt(temp[1]), MONTHS.indexOf(temp[0]));
  if (cal.month != 11) {
    cal.month = cal.month + 1;
  } else {
    cal.month = 0;
    cal.year = cal.year + 1;
  }
  renderMonth(cal);
  updateCalender(cal);
};

const prevMonth = () => {
  const currMonthYear = document.getElementById("month");
  let temp = currMonthYear.innerText.split(" ");
  const cal = new Calendar(parseInt(temp[1]), MONTHS.indexOf(temp[0]));
  if (cal.month != 0) {
    cal.month = cal.month - 1;
  } else {
    cal.year = cal.year - 1;
    cal.month = 11;
  }
  renderMonth(cal);
  updateCalender(cal);
};

startCalendar();
