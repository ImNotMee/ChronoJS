const log = console.log;
"use strict";
(function(global) {
  function Calendar(year, month) {
      this.year = year;
      this.month = month;
      this.appointments = [];
      this.romanNumeral = false;
      this.dates = {};
  }

  function Appointment(name, notes, start, end, type) {
    this.id = Appointment.appointmentID;
    this.name = name;
    this.notes = notes;
    this.startTime = new Date(start);
    this.endTime = new Date(end);
    this.type = this.typeConverter(type);
    Appointment.appointmentID ++;
  }

  Calendar.prototype = {

    // Calendar Render functions
    __getMonthData: function() {
      const firstDay = new Date(this.year, this.month, 1);
      const numOfDays = new Date(this.year, this.month, 0);
      // first element is the month (in a num), second is the number of days in this month
      return [firstDay.getDay(), numOfDays.getDate()];
    },

    _getMonth: function() {
      let d = new Date();
      return d.getMonth();
    },

    _sortingAppointments: function(apps) {
      let sorted = apps;
      apps.sort((appA, appB) => {
        const timeA = new Date(appA.startTime);
        const timeB = new Date(appB.startTime);

        return (timeA === timeB) ? 0 : (timeA > timeB) ? 1 : -1;
      })
      return sorted;
    },

     _dateFormater: function(date) {
      const year = date.getFullYear();
      const month = Calendar.MONTHS[date.getMonth()];
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
    },

     _addThisMonthAppointments: function() {
      // clearing old appointments
      const eventBox = document.getElementById("appointments");
      while (eventBox.firstChild) {
        eventBox.removeChild(eventBox.lastChild);
      }

      let app = this.getAppointments();
      app = this._sortingAppointments(app);
      // adding to the event list
      app.forEach(a => {
          let eachBox = document.createElement("div");
          eachBox.id = "app";
          eachBox.innerHTML = a.name.bold() + " " + this._dateFormater(a.startTime) + "-" + this._dateFormater(a.endTime) +
          "<br /> Notes: " + a.notes;
          eachBox.style.backgroundColor = a.type;
          eventBox.appendChild(eachBox);
      });

      // adding to celendar
      let elements = document.querySelectorAll('#dates');

      for (let n = 0; n < elements.length; n++) {
        for (let i = 0; i < app.length; i++) {
          if (this.romanNumeral) {
            let romanToDate = Calendar.ROMAN.findIndex(roman => roman === elements[n].innerText);
            if (romanToDate + 1 == app[i].startTime.getDate()) {
              let appBox = document.createElement("div");
              appBox.id = "app";
              appBox.innerHTML = app[i].name.bold() + " " + this._dateFormater(app[i].startTime) + "-" + this._dateFormater(app[i].endTime) +
              "<br /> Notes: " + app[i].notes;
              appBox.style.backgroundColor = app[i].type;
              elements[n].appendChild(appBox);
            }
          } else {
            if (elements[n].innerText == app[i].startTime.getDate()) {
              let appBox = document.createElement("div");
              appBox.id = "app";
              appBox.innerHTML = app[i].name.bold() + " " + this._dateFormater(app[i].startTime) + "-" + this._dateFormater(app[i].endTime) +
              "<br /> Notes: " + app[i].notes;
              appBox.style.backgroundColor = app[i].type;
              elements[n].appendChild(appBox);
            }
          }
        }
      }
    },

   _updateCalendar: function () {
      this._renderMonth();
      const currMonthData = this.__getMonthData();
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
              ele.innerHTML = Calendar.ROMAN[date-1];
             date ++;
          } else {
            ele.innerHTML = "";
          }
          temp ++;
        })
      }
      this._addThisMonthAppointments();
    },

    _renderButton: function() {
        const prevButton = document.createElement("button");
        const nextButton = document.createElement("button");
        const prevImg = document.createElement("img");
        prevImg.id ="arrows";
        prevImg.src ="https://image.flaticon.com/icons/svg/892/892512.svg"
        const nextImg = document.createElement("img");
        nextImg.id ="arrows";
        nextImg.src ="https://image.flaticon.com/icons/svg/892/892528.svg"
        prevButton.appendChild(prevImg);
        nextButton.appendChild(nextImg);

        prevButton.onclick = () => {
                this._prevMonth();
        };
        nextButton.onclick = () => {
                this._nextMonth();
        };
        return [prevButton, nextButton];
    },

     _nextMonth: function() {
      if (this.month != 11) {
        this.month = this.month + 1;
      } else {
        this.month = 0;
        this.year = this.year + 1;
      }
      this._updateCalendar();
    },

    _prevMonth: function() {
      if (this.month != 0) {
        this.month = this.month - 1;
      } else {
        this.year = this.year - 1;
        this.month = 11;
      }
      this._updateCalendar();
    },

    _renderDates: function () {
      const currMonthData = this.__getMonthData();
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
    },

   _renderMonth: function () {
      const topCalDiv = document.getElementById("calendarButtons");
      while (topCalDiv.firstChild) {
        topCalDiv.removeChild(topCalDiv.firstChild);
      }
      const monthDiv = document.createElement("div");
      monthDiv.id = "month";
      const buttons = this._renderButton();
      monthDiv.innerHTML = Calendar.MONTHS[this.month] +" " + this.year;
      topCalDiv.appendChild(buttons[0]);
      topCalDiv.appendChild(monthDiv);
      topCalDiv.appendChild(buttons[1]);
    },

    _saveDates: function() {
      const dates = document.querySelectorAll('#dates');
      let a = {};
      let weekN = 1;
      let b = [];
      let c = 0;
      dates.forEach(d => {
        if(c < 7) {
          b.push(d);
          c = c + 1;
        }
        else {
          c = 0;
          a[weekN] = b;
          b = [];
          weekN = weekN + 1;
        }
      });
      return a;
    },

    _clearCalendarBox: function() {
       while (document.getElementById("dates")) {
          document.getElementById("dates").remove();
      }
    },

    _weekView: function(weekNum) {
      this._clearCalendarBox();
      let calBody = document.getElementById("container");
      let calBox = document.createElement("div");
      calBox.id = "calendarRow";
      for (let i = 0; i < 7; i++) {
        if (this.romanNumeral) {
          //const roman = Calendar.ROMAN[weekNum*7+i];
          //if (roman !== undefined) {
            log(this.dates[weekNum][i].innerText);
            //this.dates[weekNum][i].innerText = roman;
          //}
          calBox.appendChild((this.dates[weekNum][i]));
        }
        else {
          calBox.appendChild((this.dates[weekNum][i]));
        }
      }
      calBody.appendChild(calBox);
    },

    startCalendar: function() {
      this._renderCalendar();
    },

    _renderCalendar: function() {
        // For setting up the grid based on month
        this._renderMonth();
        this._renderDates();
        this._addThisMonthAppointments();
        const a = this._saveDates();
        this.dates = a;
    },

    changeRomanNumerals: function(e) {
      e.preventDefault();
      const selected = document.querySelector('#roman');
      const roman = selected.options[selected.selectedIndex].value;
      const dates = document.querySelectorAll("#dates");

      const currMonthYear = document.getElementById("month");
      let temp = currMonthYear.innerText.split(" ");
      // Iusse here
      let day = 0;
      if (roman === "on") {
        calen.romanNumeral =  true;
        dates.forEach(date => {
          if (date.innerText != "") {
            date.innerText = Calendar.ROMAN[day];
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
      this._updateCalendar();
    },

    changeTheme: function(e) {
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
    },

     weekSelect: function(e) {
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
        if (document.querySelector("#weekOptions")) {
          document.querySelector("#weekOptions").remove();
        }
        this._clearCalendarBox();
        if (this.romanNumeral) {
          this.changeRomanNumerals();
        }
        this.startCalendar();
      }
    },

    weekDisplay: function(e) {
      e.preventDefault();
      const selected = document.querySelector('#weekNum');
      const weekNum = selected.options[selected.selectedIndex].value;
      this._weekView(weekNum);
    },

     prevMonth: function() {
       log("a");
     if (this.month != 0) {
       this.month = this.month - 1;
     } else {
       this.year = this.year - 1;
       this.month = 11;
     }
     this._updateCalendar();
   },

    // --------------------- Developer tools ---------------------------------
    //Devs can do
    addAppointment: function(name, notes, start, end, type) {
      const app = new Appointment(name, notes, start, end, type);
      this.appointments.push(app);
      return app;
    },

    // Devs can do
    removeAppointment: function(id) {
      let newAppointments = appointments.filter(app => app.id != id);
      return newAppointments;
    },

    // Dev can do
    getAppointments: function() {
      let t = this.appointments.filter(app => app.startTime.getMonth() === this.month && app.startTime.getFullYear() === this.year);
      return t;
    },

    // Dev can do
    editAppointment: function(id, name, notes, startTime, endTime, type) {
      let t = appointments.filter(a => a.id === id);
      if (t.length === 1) {
        t[0].name = name;
        t[0].notes = notes;
        t[0].startTime = startTime;
        t[0].endTime = endTime;
        t[0].type = t[0].typeConverter(type);
        log("update to appointment" + a.id +  "completed");
      }
      else {
        log("failed to update appointment");
      }
    },

    // Dev can do
    loadAppointments: function(appointments) {
      appointments.forEach(app => {
        const temp = new Appointment(app.name,app.notes, app.startTime, app.endTime, app.type);
        if (temp !== undefined || temp !== null) {
          this.appointments.push(temp);
        }
      })
      log(this.appointments);
    },

    // Devs can do
    alertAppointments: function() {
      const thisMonthApps = this.getAppointments();
      const d = new Date();
      thisMonthApps.forEach(app => {
        if (app.startTime.getDate() === d.getDate() && app.startTime.getHours()+1 === d.getHours()) {
          alert(app.name + " is in an hour.");
        }
      })
    },

    // Dev can do
    // bgColour can be a list [colour1, colour2] or a colour hex code
    calendarTheme: function(textColour, bgColour, type) {
      const calBody = document.querySelector('#calendarBody');
      if (type === "solid") {
        calBody.style.backgroundImage = bgColour;;
      }
      else if (type === "gradient") {
        if (bgColour.length == 2) {
          calBody.style.backgroundImage = "linear-gradient(180deg," +bgColour[0]+ " ,"+ bgColour[1]+" )";
        }
      }
      calBody.style.color = textColour;
    }
  }

  Appointment.prototype = {
    typeConverter: function(type) {
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

  global.Calendar = global.Calendar || Calendar
  global.Appointment =  global.Appointment || Appointment
})(window);

// Constants
Calendar.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
Calendar.ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI",
"XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX","XXI","XXII","XXIII","XXIV",
"XXV","XXVI","XXVII","XXVIII","XXIX","XXX","XXXI"];
Appointment.appointmentID = 0;

// Calendar settings
Calendar.romanForm = document.querySelector('#romanOptions');
Calendar.themeForm = document.querySelector('#themeOptions');
Calendar.display = document.querySelector('#displayOptions');
Calendar.romanForm.addEventListener('submit', this.changeTheme);
Calendar.themeForm.addEventListener('submit', this.changeRomanNumerals);
Calendar.display.addEventListener('submit', this.weekSelect);


// const nextMonth = () => {
//   if (calen.month != 11) {
//     calen.month = calen.month + 1;
//   } else {
//     calen.month = 0;
//     calen.year = calen.year + 1;
//   }
//   calen._updateCalendar();
// };
//
// //  const prevMonth = () => {
// //   if (calen.month != 0) {
// //     calen.month = calen.month - 1;
// //   } else {
// //     calen.year = calen.year - 1;
// //     calen.month = 11;
// //   }
// //   calen._updateCalendar();
// // };

const appAddForm = document.querySelector('#appAddForm');
appAddForm.addEventListener('submit', addAppointmentDOM);

function addAppointmentDOM(e) {
  e.preventDefault();
  const name = document.querySelector('#newAppName').value;
  const startD = document.querySelector('#newAppStartDate').value;
  const startT = document.querySelector('#newAppStartTime').value;
  const endT = document.querySelector('#newAppEndTime').value;
  const notes = document.querySelector('#newAppNotes').value;
  const selected = document.querySelector('#newAppType');
  const type = selected.options[selected.selectedIndex].value;
  log(type);
  const timeSlot = dateEntry(startD,startT,endT);
  if (timeSlot[0] !== "Invalid Date" && timeSlot[1] !== "Invalid Date") {
    addNewAppointment(name, notes, timeSlot[0], timeSlot[1], type);
  }
  else {
    alert("Invalid Start or End time/date");
  }
}

function dateEntry(startD, startT, endT) {
  const start = new Date(startD+"T"+startT).toUTCString();
  const end = new Date(startD+"T"+endT).toUTCString();
  return [start, end];
}

function _dateFormater(date) {
  const year = date.getFullYear();
  const month = Calendar.MONTHS[date._getMonth()];
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

const addNewAppointment = (name, notes, start, end, type) => {
  const app = calen.addAppointment(name, notes, start, end, type);
    //if (calen.month === new Date()._getMonth()) {}
    const eventBox = document.getElementById("appointments");
    let eachBox = document.createElement("div");
    eachBox.id = "app";
    eachBox.innerHTML = app.name.bold() + " - " + _dateFormater(app.startTime) + "-" + _dateFormater(app.endTime) +
    "<br /> Notes: " + app.notes;
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
          appBox.innerHTML = app.name.bold() + " - " + _dateFormater(app.startTime) + "-" + _dateFormater(app.endTime) +
          "<br /> Notes: " + app.notes;
          appBox.style.backgroundColor = app.type;
          elements[n].appendChild(appBox);
      }
    }
}
