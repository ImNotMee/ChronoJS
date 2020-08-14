const log = console.log;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI",
"XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI","XXII","XXIII","XXIV",
"XXV","XXVI","XXVII","XXVIII","XXIX","XXX","XXXI"];

class Calendar {
  constructor(year, month) {
    this.year = year;
    this.month = month;
    this.appointments = [];
    this.romanNumeral = false;
  }

  loadAppointments(appointments) {
    this.appointments = appointments;
  }

  getMonthData() {
    const firstDay = new Date(this.year, this.month, 1);
    const numOfDays = new Date(this.year, this.month, 0);
    // first element is the month (in a num), second is the number of days in this month
    return [firstDay.getDay(), numOfDays.getDate()];
  };

  getMonth() {
    let d = new Date();
    return d.getMonth();
  };

   sortingAppointments(apps) {
    let sorted = apps;
    apps.sort((appA, appB) => {
      const timeA = new Date(appA.startTime);
      const timeB = new Date(appB.startTime);

      return (timeA === timeB) ? 0 : (timeA > timeB) ? 1 : -1;
    })
    return sorted;
  }

   getAppointments() {
    let t = this.appointments.filter(app => app.startTime.getMonth() === this.month);
    return t;
  }

   dateFormater(date) {
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


   addThisMonthAppointments() {
    // clearing old appointments
    const eventBox = document.getElementById("appointments");
    while (eventBox.firstChild) {
      eventBox.removeChild(eventBox.lastChild);
    }

    let app = this.getAppointments();
    app = this.sortingAppointments(app);
    // adding to the event list
    app.forEach(a => {
        let eachBox = document.createElement("div");
        eachBox.id = "app";
        eachBox.innerHTML = a.name.bold() + " " + this.dateFormater(a.startTime) + "-" + this.dateFormater(a.endTime) +
        "<br /> Notes: " + a.notes;
        eachBox.style.backgroundColor = a.type;
        eventBox.appendChild(eachBox);
    });

    // adding to celendar
    let elements = document.querySelectorAll('#dates');

    for (let n = 0; n < elements.length; n++) {
      for (let i = 0; i < app.length; i++) {
        if (this.romanNumeral) {
          let romanToDate = ROMAN.findIndex(roman => roman === elements[n].innerText);
          log(romanToDate + " ----- " + ROMAN[romanToDate])
          if (romanToDate + 1 == app[i].startTime.getDate()) {
            let appBox = document.createElement("div");
            appBox.id = "app";
            appBox.innerHTML = app[i].name.bold() + " " + this.dateFormater(app[i].startTime) + "-" + this.dateFormater(app[i].endTime) +
            "<br /> Notes: " + app[i].notes;
            appBox.style.backgroundColor = app[i].type;
            elements[n].appendChild(appBox);
          }
        } else {
          if (elements[n].innerText == app[i].startTime.getDate()) {
            let appBox = document.createElement("div");
            appBox.id = "app";
            appBox.innerHTML = app[i].name.bold() + " " + this.dateFormater(app[i].startTime) + "-" + this.dateFormater(app[i].endTime) +
            "<br /> Notes: " + app[i].notes;
            appBox.style.backgroundColor = app[i].type;
            elements[n].appendChild(appBox);
          }
        }
      }
    }
  }

 updateCalendar () {
    this.renderMonth();
    const currMonthData = this.getMonthData();
    let elements = document.querySelectorAll('#dates');
    let date = 1;
    let temp = 0;
    if (!this.romanNumeral) {
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
            ele.innerHTML = ROMAN[date-1];
           date ++;
        } else {
          ele.innerHTML = "";
        }
        temp ++;
      })
    }
    this.addThisMonthAppointments();
  }

  renderDates () {
    const currMonthData = this.getMonthData();
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

 renderMonth () {
    const monthDiv = document.getElementById("month");
    if(monthDiv != null) {
      monthDiv.innerText = MONTHS[this.month] +" " + this.year;
    }
  }

  clearCalendarBox() {
    // let a = 1;
    // const dates = document.querySelectorAll('#dates');
    // dates.forEach(d => {
    //   if (a < (weekNum -1)*7) {
    //     console.log(a);
    //     d.remove();
    //   }
    //   else if (a > weekNum*7) {
    //     console.log(a);
    //     d.remove();
    //   }
    //   a = a + 1;
    // });
     while (document.getElementById("dates")) {
        document.getElementById("dates").remove();
    }
  }

  weekView(weekNum) {
    this.clearCalendarBox();
    const currMonthData = this.getMonthData();
    let date = 1;
    let temp = 0;
    let calBody = document.getElementById("container");
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

  startCalendar() {
    this.renderCalendar();
  }

  renderCalendar() {
      // For setting up the grid based on month
      this.renderMonth();
      this.renderDates();
      this.addThisMonthAppointments();
  }
}


const nextMonth = () => {
  if (calen.month != 11) {
    calen.month = calen.month + 1;
  } else {
    calen.month = 0;
    calen.year = calen.year + 1;
  }
  calen.loadAppointments(apps);
  calen.updateCalendar();
};

 const prevMonth = () => {
  if (calen.month != 0) {
    calen.month = calen.month - 1;
  } else {
    calen.year = calen.year - 1;
    calen.month = 11;
  }
  calen.loadAppointments(apps);
  calen.updateCalendar();
};

// Calendar settings
const romanForm = document.querySelector('#romanOptions');
const themeForm = document.querySelector('#themeOptions');
const display = document.querySelector('#displayOptions');
themeForm.addEventListener('submit', changeTheme);
romanForm.addEventListener('submit', changeRomanNumerals);
display.addEventListener('submit', weekSelect);

function changeRomanNumerals(e) {
  e.preventDefault();
  const selected = document.querySelector('#roman');
  const roman = selected.options[selected.selectedIndex].value;
  const dates = document.querySelectorAll("#dates");

  const currMonthYear = document.getElementById("month");
  let temp = currMonthYear.innerText.split(" ");
  let day = 0;
  if (roman === "on") {
    calen.romanNumeral =  true;
    dates.forEach(date => {
      if (date.innerText != "") {
        date.innerText = ROMAN[day];
        day ++;
      }
    });
  }
  else {
      day = 1;
      calen.romanNumeral = false;
      dates.forEach(date => {
        if (date.innerText != "") {
          date.innerText = day;
          day ++;
        }
      });
  }
  calen.updateCalendar();
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
    calBody.style.color = '#000000';
  }
  else if(theme === "spring") {
    calBody.style.backgroundImage = "linear-gradient(0deg, #ddd6f3, #faaca8)";
    calBody.style.color = '#ffffff';
  }
  else if(theme === "winter") {
    calBody.style.backgroundImage = "linear-gradient(to top right, #076585, #ffffff)";
    calBody.style.color = '#000000';
  }
}

function weekSelect(e) {
  e.preventDefault();
  const selected = document.querySelector('#display');
  const display = selected.options[selected.selectedIndex].value;
  if (display === "week") {
    // check for if already created
    const checker = document.querySelector('#weekOptions')
    if(!checker) {
      const setting = document.querySelector('#setting');
      const form = document.createElement("form");
      form.id ="weekOptions"
      form.innerText = "Weeks ";
      const selector = document.createElement("select");
      selector.id = "weekNum";
      const option1 = document.createElement("option");
      option1.value = "1";
      option1.innerText = "1";
      const option2 = document.createElement("option");
      option2.value = "2";
      option2.innerText = "2";
      const option3 = document.createElement("option");
      option3.value = "3";
      option3.innerText = "3";
      const option4 = document.createElement("option");
      option4.value = "4";
      option4.innerText = "4";
      const option5 = document.createElement("option");
      option5.value = "5";
      option5.innerText = "5";
      selector.appendChild(option1);
      selector.appendChild(option2);
      selector.appendChild(option3);
      selector.appendChild(option4);
      selector.appendChild(option5);
      form.appendChild(selector);

      const submit = document.createElement("input");
      submit.type = "submit";
      submit.value = "Change";
      form.appendChild(submit);
      setting.appendChild(form);

      //call function to update
      const weekForm = document.querySelector('#weekOptions');
      weekForm.addEventListener('submit', weekDisplay);
    }
  }
  else if (display === "month") {
    console.log("month");
    // Remmove week options
    document.querySelector("#weekOptions").remove();
    calen.renderDates();
    calen.addThisMonthAppointments();
  }
  else if (display === "day") {
    console.log("day");
    // Remmove week options
    document.querySelector("#weekOptions").remove();
  }
}

function weekDisplay(e) {
  e.preventDefault();
  const selected = document.querySelector('#weekNum');
  const weekNum = selected.options[selected.selectedIndex].value;
  calen.weekView(weekNum);
}
