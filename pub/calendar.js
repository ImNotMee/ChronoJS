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
      type: "#fff175"
    },
    {
      id: 1,
      name: "Family Dinner",
      notes: "buy gifts",
      startTime: new Date(2020,6, 11),
      endTime: new Date(2020, 6,11),
      type: "#35d45f"
    },
    {
      id: 2,
      name: "Meeting with Friends",
      notes: "Playing Pool",
      startTime: new Date(2020,5, 11),
      endTime: new Date(2020, 5,11),
      type: "#35d45f"
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
  monthDiv.innerText = MONTHS[calendar.month] +" " + calendar.year;
}

// const nextMonth = () => {
//   if (today.month != 11) {
//     renderMonth(MONTHS[today.month + 1]);
//     today.month = today.month + 1;
//   } else {
//       renderMonth(MONTHS[0]);
//       today.month = 0;
//       today.year = today.year + 1;
//   }
//   const newCal = new Calendar(today.year, today.month);
//   updateCalender(newCal);
// };
//
// const prevMonth = () => {
//   if (today.month != 0) {
//     renderMonth(MONTHS[today.month - 1]);
//     today.month = today.month - 1;
//   } else {
//     renderMonth(MONTHS[11]);
//     today.year = today.year - 1;
//     today.month = 11;
//   }
//   const newCal = new Calendar(today.year, today.month);
//   updateCalender(newCal);
// };

startCalendar();
