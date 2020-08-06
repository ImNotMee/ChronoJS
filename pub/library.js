const log = console.log;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","XI","X","XI",
"XII","XIII","XIV","XV","XVI","XVII","XVII","XVIII","XIX","XX","XXI","XXII","XXIII","XXIV",
"XXV","XXVI","XXVII","XXVII","XXVIII","XXIX","XXX","XXXI"];

class Calendar {
  constructor(year, month) {
    this.year = year;
    this.month = month;
    this.appointments = [];
    this.romanNumeral = false;
  }
}

function startCalendar(calendar) {
  renderCalendar(calendar);
}

function loadAppointments(calendar, appointments) {
  calendar.appointments = appointments;
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
  let t = calendar.appointments.filter(app => app.startTime.getMonth() === calendar.month);
  return t;
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
      if (elements[n].innerText == app[i].startTime.getDate() || elements[n].innerText === ROMAN[n]) {
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

const updateCalendar = (calendar) => {
  renderMonth(calendar);
  const currMonthData = getMonthData(calendar);
  let elements = document.querySelectorAll('#dates');
  let date = 1;
  let temp = 0;
  if (!calendar.romanNumeral) {
    elements.forEach(ele => {
      if (temp >= currMonthData[0] && date <= currMonthData[1]) {
          ele.innerHTML = date;
         date ++;
      } else {
        ele.innerHTML = "";
      }
      temp ++;
    })
  } else {
    elements.forEach(ele => {
      if (temp >= currMonthData[0] && date <= currMonthData[1]) {
          ele.innerHTML = ROMAN[temp];
         date ++;
      } else {
        ele.innerHTML = "";
      }
      temp ++;
    })
  }
  addThisMonthAppointments(calendar);
}

const renderDates = (calendar) => {
  const currMonthData = getMonthData(calendar);
  let date = 1;
  let temp = 0;
  let calBody = document.getElementById("container");
  for (let n = 0; n < 6; n ++) {
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
  loadAppointments(cal, apps);
  updateCalendar(cal);
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
  loadAppointments(cal, apps);
  updateCalendar(cal);
};


// Calendar settings
const romanForm = document.querySelector('#romanOptions');
const themeForm = document.querySelector('#themeOptions');
themeForm.addEventListener('submit', changeTheme);
romanForm.addEventListener('submit', changeRomanNumerals);

function changeRomanNumerals(e) {
  e.preventDefault();
  const selected = document.querySelector('#roman');
  const roman = selected.options[selected.selectedIndex].value;
  const dates = document.querySelectorAll("#dates");

  const currMonthYear = document.getElementById("month");
  let temp = currMonthYear.innerText.split(" ");
  const cal = new Calendar(parseInt(temp[1]), MONTHS.indexOf(temp[0]));
  let day = 0;
  if (roman === "on") {
    cal.romanNumeral =  true;
    dates.forEach(date => {
      if (date.innerText != "") {
        date.innerText = ROMAN[day];
        day ++;
      }
    });
  }
  else {
      day = 1;
      cal.romanNumeral = false;
      dates.forEach(date => {
        if (date.innerText != "") {
          date.innerText = day;
          day ++;
        }
      });
  }
  updateCalendar(cal);
}

function changeTheme(e) {
  e.preventDefault();
  const selected = document.querySelector('#theme');
  const theme = selected.options[selected.selectedIndex].value;
  const calBody = document.querySelector('#calendarBody');
  if (theme === "light") {
    calBody.style.backgroundImage = "";
    calBody.style.backgroundColor = '#ffffff';
    calBody.style.color = '#000000';
  }
  else if (theme === "dark") {
    calBody.style.backgroundImage = "";
    calBody.style.backgroundColor = '#2c2c2c';
    calBody.style.color = '#ffffff';
  }
  else if(theme === "earthly") {
    calBody.style.backgroundImage = "linear-gradient(180deg, #649173, #DBD5A4)";
  }
  else if(theme === "spring") {
    calBody.style.backgroundImage = "linear-gradient(0deg, #ddd6f3, #faaca8)";
  }
  else if(theme === "winter") {
    calBody.style.backgroundImage = "linear-gradient(to top right, #076585, #ffffff)";
  }
}
