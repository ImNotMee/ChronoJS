const log = console.log;
"use strict";

(function(global) {
  function Calendar(year, month) {
      this.year = year;
      this.month = month;
      this.appointments = [];
      this.romanNumeral = false;
      this.dates = {};
      this.started = false;
      this.theme = [];
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

  Calendar.prototype = {

    // Calendar Render functions
    _getMonthData: function() {
      const firstDay = new Date(this.year, this.month, 1);
      const numOfDays = new Date(this.year, this.month+1, 0);
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

     // formating the time to display on calendar and app list
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

    _renderCustomTheme: function() {
      if(this.theme.length === 2) {
        const calBody = document.querySelector('#calendarBody');
        calBody.style.color = this.theme[0];
        calBody.style.backgroundColor = this.theme[1];
      }
      else if (this.theme.length === 3) {
        calBody.style.backgroundImage = "linear-gradient(180deg," +this.theme[1]+ " ,"+ this.theme[2]+" )";;
      }
    },

    _addToAppList: function(eventBox, app) {
      app.forEach(a => {
          let eachBox = document.createElement("div");
          eachBox.id = "app";
          eachBox.innerHTML = a.name.bold() + " - " + this._dateFormater(a.startTime) + " - " + this._dateFormater(a.endTime);
          if (a.notes !== "") {
            eachBox.innerHTML = eachBox.innerHTML + "<br /> <strong>Notes:</strong> " + a.notes;
          }
          eachBox.style.backgroundColor = a.type;
          eventBox.appendChild(eachBox);
      });
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
      this._addToAppList(eventBox, app);
      // adding to celendar
      let elements = document.querySelectorAll('#dates');

      for (let n = 0; n < elements.length; n++) {
        for (let i = 0; i < app.length; i++) {
          let romanToDate = -2;
          if (this.romanNumeral) {
            romanToDate = Calendar.ROMAN.findIndex(roman => roman === elements[n].innerText);
          }
          if (romanToDate + 1 === app[i].startTime.getDate() || parseInt(elements[n].innerText) === app[i].startTime.getDate()) {
              let appBox = document.createElement("div");
              appBox.id = "app";
              appBox.innerHTML = app[i].name.bold() + " - " + this._dateFormater(app[i].startTime) + " - " + this._dateFormater(app[i].endTime);
              if (app[i].notes !== "") {
                appBox.innerHTML = appBox.innerHTML + "<br /> <strong>Notes:</strong> " + app[i].notes;
              }
              appBox.style.backgroundColor = app[i].type;
              elements[n].appendChild(appBox);
            }
        }
      }
      this.dates = this._saveDates();
    },

    _test: function() {
      let elements = document.querySelectorAll('#dates');
    },

   _updateCalendar: function () {
      this._renderMonth();
      const currMonthData = this._getMonthData();
      // update the dates element of the months
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

    // render roman numerals option
    _renderRoman: function (box) {
      const romanOptions = document.createElement("form");
      romanOptions.id = "romanOptions";
      const romNum = document.createElement("label");
      romNum.innerText ="Roman Numerals:";
      romanOptions.appendChild(romNum);
      const roman = document.createElement("select");
      roman.id ="roman";
      const off = document.createElement("option");
      off.setAttribute('value', 'off');
      off.innerText="Off";
      off.setAttribute('selected', true);
      const on = document.createElement("option");
      on.setAttribute('value', 'on');
      on.innerText='On';
      roman.appendChild(off);
      roman.appendChild(on);
      romanOptions.appendChild(roman);

      const change = document.createElement("input");
      change.setAttribute('type', 'submit');
      change.setAttribute('value', 'Change');
      change.onsubmit="return false";
      change.addEventListener('click', event => {
          this._changeRomanNumerals(event);
      }, false);
      romanOptions.appendChild(change);
      box.appendChild(romanOptions);
    },

    // render themes option
    _renderTheme: function(box) {
      const themeOptions = document.createElement("form");
      themeOptions.id = "themeOptions";

      const label = document.createElement("label");
      label.innerText ="Theme:";
      themeOptions.appendChild(label);
      const theme = document.createElement("select");
      theme.id ="theme";
      const light = document.createElement("option");
      light.setAttribute('value', 'light');
      light.innerText="Light";
      light.setAttribute('selected', true);
      const dark = document.createElement("option");
      dark.setAttribute('value', 'dark');
      dark.innerText='Dark';
      const earthly = document.createElement("option");
      earthly.innerText='Earthly';
      earthly.setAttribute('value', 'earthly');
      const spring = document.createElement("option");
      spring.innerText='Spring';
      spring.setAttribute('value', 'spring');
      const winter = document.createElement("option");
      winter.innerText='Winter';
      winter.setAttribute('value', 'winter');
      theme.appendChild(light);
      theme.appendChild(dark);
      theme.appendChild(earthly);
      theme.appendChild(spring);
      theme.appendChild(winter);
      themeOptions.appendChild(theme);

      const submit = document.createElement("input");
      submit.setAttribute('type', 'submit');
      submit.setAttribute('value', 'Set Theme');
      submit.onsubmit="return false";
      submit.addEventListener('click', event => {
          this._changeTheme(event);
      }, false);
      themeOptions.appendChild(submit);
      box.appendChild(themeOptions);
    },

    // render Calendar display options
    _renderCalendarDis: function(box) {
      const displayOptions = document.createElement("form");
      displayOptions.id = "displayOptions";
      const disLabel = document.createElement("label");
      disLabel.innerText ="Calendar Display:";
      displayOptions.appendChild(disLabel);

      const display = document.createElement("select");
      display.id ="display";
      const month = document.createElement("option");
      month.setAttribute('value', 'month');
      month.innerText="Month";
      month.setAttribute('selected', true);
      const week = document.createElement("option");
      week.setAttribute('value', 'week');
      week.innerText='Week';
      display.appendChild(month);
      display.appendChild(week);
      displayOptions.appendChild(display);

      const submitDis = document.createElement("input");
      submitDis.setAttribute('type', 'submit');
      submitDis.setAttribute('value', 'Display');
      submitDis.onsubmit="return false";
      submitDis.addEventListener('click', event => {
          this._weekSelect(event);
      }, false);
      displayOptions.appendChild(submitDis);
      box.appendChild(displayOptions);
    },

    _renderJumpDate: function() {
      log("a");
      const box = document.getElementById("jumpF");
      const jump = document.createElement("form");
      jump.id = "jumpS";

      const label1 = document.createElement("label");
      label1.innerText ="Month:";
      jump.appendChild(label1);
      const month = document.createElement("input");
      month.id ="jumpM";
      month.setAttribute("maxlength", 2);
      jump.appendChild(month);
      const label2 = document.createElement("label");
      label2.innerText ="Year:";
      jump.appendChild(label2);
      const year = document.createElement("input");
      year.id = "jumpY"
      year.setAttribute("maxlength", 4);
      jump.appendChild(year);
      box.appendChild(jump);

      const submit = document.createElement("input");
      submit.setAttribute('type', 'submit');
      submit.setAttribute('value', 'Change');
      submit.onsubmit="return false";
      submit.addEventListener('click', event => {
          this._jumpTo(event);
      }, false);
      jump.appendChild(submit);
      box.appendChild(jump);
    },

    _jumpTo: function(e) {
      e.preventDefault();
      const jumpM = document.querySelector('#jumpM').value;
      const jumpY = document.querySelector('#jumpY').value;;

      if (jumpM >= 1 && jumpM <= 12 && jumpY > 0 && jumpY < 9999) {
        this.month = jumpM - 1;
        this.year = jumpY;
        this._updateCalendar();
      }
      else {
        alert("Invalid month and year entry");
      }
    },

    _renderSettings: function() {
      const box = document.getElementById("setting");
      //roman
      this._renderRoman(box);
      //theme
      this._renderTheme(box);
      // calendar display
      this._renderCalendarDis(box);
    },

    _renderAddApp: function() {
      const addAppBox = document.getElementById("addAppointmentForm");
      const appAddForm = document.createElement("form");
      appAddForm.id = "appAddForm"
      const newAppName = document.createElement("input");
      newAppName.setAttribute('type', 'text');
      newAppName.maxlength = "40";
      newAppName.id ="newAppName";
      const newAppStartDate = document.createElement("input");
      newAppStartDate.setAttribute('type', 'text');
      newAppStartDate.maxlength = "10";
      newAppStartDate.id ="newAppStartDate";
      newAppStartDate.placeholder ="YYYY-MM-DD"
      const newAppStartTime = document.createElement("input");
      const newAppEndTime = document.createElement("input");
      newAppStartTime.setAttribute('type', 'time');
      newAppEndTime.setAttribute('type', 'time');
      newAppStartTime.id ="newAppStartTime";
      newAppEndTime.id ="newAppEndTime";
      const newAppNotes = document.createElement("input");
      newAppNotes.setAttribute('type', 'text');
      newAppNotes.maxlength = "70";
      newAppNotes.id= "newAppNotes";

      const label1 = document.createElement("label");
      const label2 = document.createElement("label");
      const label3 = document.createElement("label");
      const label4 = document.createElement("label");
      const label5 = document.createElement("label");
      label1.innerText = "Name:";
      label2.innerText = "Start Date:";
      label3.innerText = "Start Time:";
      label4.innerText = "End Time:";
      label5.innerText = "Notes:";
      appAddForm.appendChild(label1);
      appAddForm.appendChild(newAppName);
      appAddForm.appendChild(label2);
      appAddForm.appendChild(newAppStartDate);
      appAddForm.appendChild(label3);
      appAddForm.appendChild(newAppStartTime);
      appAddForm.appendChild(label4);
      appAddForm.appendChild(newAppEndTime);
      appAddForm.appendChild(label5);
      appAddForm.appendChild(newAppNotes);

      const label6 = document.createElement("label");
      label6.innerText ="Type:";
      appAddForm.appendChild(label6);
      const newAppType = document.createElement("select");
      newAppType.id ="newAppType";
      const option1 = document.createElement("option");
      option1.setAttribute('value', 'important');
      option1.innerText="Important";
      option1.setAttribute('selected', true);
      const option2 = document.createElement("option");
      option2.setAttribute('value', 'notImportant');
      option2.innerText='Not Important';
      const option3 = document.createElement("option");
      option3.innerText='Urgent';
      option3.setAttribute('value', 'urgent');
      newAppType.appendChild(option1);
      newAppType.appendChild(option2);
      newAppType.appendChild(option3);
      appAddForm.appendChild(newAppType);

      const submit = document.createElement("input");
      submit.setAttribute('type', 'submit');
      submit.setAttribute('value', 'Add Appointment');
      submit.onsubmit="return false";
      submit.addEventListener('click', event => {
          this._addAppointmentDOM(event);
      }, false);
      appAddForm.appendChild(submit);
      addAppBox.appendChild(appAddForm);
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
      const currMonthData = this._getMonthData();
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

    _renderHeader: function() {
      const calBody = document.getElementById("CalendarModule");
      const div = document.createElement("div");
      div.id="calendarRow";
      const h1 = document.createElement("div");
      h1.id="header";
      const h2 = document.createElement("div");
      h2.id="header";
      const h3 = document.createElement("div");
      h3.id="header";
      const h4 = document.createElement("div");
      h4.id="header";
      const h5 = document.createElement("div");
      h5.id="header";
      const h6 = document.createElement("div");
      h6.id="header";
      const h7 = document.createElement("div");
      h7.id="header";
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      const p3 = document.createElement("p");
      const p4 = document.createElement("p");
      const p5 = document.createElement("p");
      const p6 = document.createElement("p");
      const p7 = document.createElement("p");

      p1.id="weekDates";
      p1.innerText = "Sunday";
      p2.id="weekDates";
      p2.innerText = "Monday";
      p3.id="weekDates";
      p3.innerText = "Tuesday";
      p4.id="weekDates";
      p4.innerText = "Wednesday";
      p5.id="weekDates";
      p5.innerText = "Thursday";
      p6.id="weekDates";
      p6.innerText = "Friday";
      p7.id="weekDates";
      p7.innerText = "Saturday";
      h1.appendChild(p1);
      h2.appendChild(p2);
      h3.appendChild(p3);
      h4.appendChild(p4);
      h5.appendChild(p5);
      h6.appendChild(p6);
      h7.appendChild(p7);
      div.appendChild(h1);
      div.appendChild(h1);
      div.appendChild(h2);
      div.appendChild(h3);
      div.appendChild(h4);
      div.appendChild(h5);
      div.appendChild(h6);
      div.appendChild(h7);
      calBody.appendChild(div);
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

    // save the dates in the calendar object
    _saveDates: function() {
      const dates = document.querySelectorAll('#dates');
      let a = {};
      let weekN = 1;
      let b = [];
      let c = 0;
      dates.forEach(d => {
        b.push(d);
        if(c < 6) {
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

    // Clear dates element to rerender
    _clearCalendarBox: function() {
       while (document.getElementById("dates")) {
          document.getElementById("dates").remove();
      }
    },

    // on change to week # view
    _weekView: function(weekNum) {
      this._clearCalendarBox();
      let calBody = document.getElementById("container");
      let calBox = document.createElement("div");
      calBox.id = "calendarRow";
      for (let i = 0; i < 7; i++) {
          calBox.appendChild((this.dates[weekNum][i]));
      }
      calBody.appendChild(calBox);
    },


    // The set up for the divs and the whole library
    _initDivs: function() {
      const calBody = document.getElementById("calendarBody");
      const eventBox = document.createElement("div");
      eventBox.id ="eventBox";

      // appointment list div
      const h2App = document.createElement("h2");
      h2App.innerText = "Appointments";
      eventBox.appendChild(h2App);
      const appointments = document.createElement("div");
      appointments.id= "appointments";
      eventBox.appendChild(appointments);

      // settings div
      const h2Settings = document.createElement("h2");
      h2Settings.innerText = "Settings";
      eventBox.appendChild(h2Settings);
      const setting = document.createElement("div");
      setting.id= "setting";
      eventBox.appendChild(setting);

      // add appointment form div
      const h2addApp = document.createElement("h2");
      h2addApp.innerText = "Add Appointment";
      eventBox.appendChild(h2addApp);
      const addAppointmentForm = document.createElement("div");
      addAppointmentForm.id= "addAppointmentForm";
      eventBox.appendChild(addAppointmentForm);
      calBody.appendChild(eventBox);

      // Toggle Bar
      const h2toggleBar = document.createElement("h2");
      h2toggleBar.innerText = "Toggle Bar";
      eventBox.appendChild(h2toggleBar);
      const toggleBar = document.createElement("div");
      toggleBar.id= "toggleBar";
      eventBox.appendChild(toggleBar);
      calBody.appendChild(eventBox);

      const h2JumpCal = document.createElement("h2");
      h2JumpCal.innerText = "Switch Month To";
      eventBox.appendChild(h2JumpCal);
      const jumpF = document.createElement("div");
      jumpF.id= "jumpF";
      eventBox.appendChild(jumpF);
      calBody.appendChild(eventBox);

      // calendar
      const calContainer = document.createElement("div");
      calContainer.id= "container";
      const h2Cal = document.createElement("h2");
      h2Cal.innerText = "Calendar";
      calContainer.appendChild(h2Cal);
      const calendarModule = document.createElement("div");
      calendarModule.id= "CalendarModule";
      const calendarButtons = document.createElement("div");
      calendarButtons.id= "calendarButtons";
      const calendarRow = document.createElement("div");
      calendarRow.id= "calendarRow";
      calendarModule.appendChild(calendarButtons);
      calendarModule.appendChild(calendarRow);
      calContainer.appendChild(calendarModule);
      calBody.appendChild(calContainer);
    },

    // The function use to start the calendar object
    startCalendar: function() {
      if (!this.started) {
        this._renderCalendar();
        this.started = true;
      }
    },

    // Render all elements of the calendar
    _renderCalendar: function() {
        // For setting up the grid based on month
        this._initDivs();
        this._renderMonth();
        this._renderHeader();
        this._renderDates();
        this._renderSettings();
        this._renderToggleBar();
        this._renderJumpDate();
        this._renderAddApp();
        this._addThisMonthAppointments();
        this._renderCustomTheme();
        const a = this._saveDates();
        this.dates = a;
    },

    // Check for valid time function
    _dateEntry: function(startD, startT, endT) {
          const start = new Date(startD+"T"+startT);
          const formatedS = start.toUTCString();
          const end = new Date(startD+"T"+endT)
          const formatedE = end.toUTCString();
          if (start.getHours() > end.getHours() || start.getMinutes() > end.getMinutes() && start.getHours() === end.getHours()) {
            alert("Invalid Start or End time/date");
            return ["Invalid Date","Invalid Date"];
          }
          return [formatedS, formatedE];
        },

   // roman Numeral DOM manipulation
    _changeRomanNumerals: function(e) {
      e.preventDefault();
      const selected = document.querySelector('#roman');
      const roman = selected.options[selected.selectedIndex].value;
      const dates = document.querySelectorAll("#dates");

      const currMonthYear = document.getElementById("month");
      let temp = currMonthYear.innerText.split(" ");
      // Iusse here
      let day = 0;
      if (roman === "on") {
        this.romanNumeral = true;
        dates.forEach(date => {
          if (date.innerText != "") {
            date.innerText = Calendar.ROMAN[day];
            day ++;
          }
        });
      }
      else {
          day = 1;
          this.romanNumeral = false;
          dates.forEach(date => {
            if (date.innerText != "") {
              date.innerText = day;
              day ++;
            }
          });
      }
      //this.dates = this._saveDates();
      this._addThisMonthAppointments();
    },

    // calendar theme DOM manipulation
    _changeTheme: function(e) {
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
        calBody.style.color = '#C0C0C0';
      }
      else if(theme === "earthly") {
        calBody.style.backgroundImage = "linear-gradient(180deg, #649173, #DBD5A4)";
        calBody.style.color = '#000000';
      }
      else if(theme === "spring") {
        calBody.style.backgroundImage = "linear-gradient(0deg, #ddd6f3, #faaca8)";
        calBody.style.color = '#6e6e6e';
      }
      else if(theme === "winter") {
        calBody.style.backgroundImage = "linear-gradient(to top right, #076585, #ffffff)";
        calBody.style.color = '#363636';
      }
    },

    // add appointment from form DOM manipulation
    _addAppointmentDOM: function(e) {
      e.preventDefault();
      const name = document.querySelector('#newAppName').value;
      const startD = document.querySelector('#newAppStartDate').value;
      const startT = document.querySelector('#newAppStartTime').value;
      const endT = document.querySelector('#newAppEndTime').value;
      const notes = document.querySelector('#newAppNotes').value;
      const selected = document.querySelector('#newAppType');
      const type = selected.options[selected.selectedIndex].value;
      const timeSlot = this._dateEntry(startD,startT,endT);

      if (timeSlot[0] !== "Invalid Date" && timeSlot[1] !== "Invalid Date") {
        this._addNewAppointment(name, notes, timeSlot[0], timeSlot[1], type);
      }
      else {
        alert("Invalid Start or End time/date");
      }
    },

    // rerender month
    _reRenderMonth: function() {
      const calBody = document.getElementById("CalendarModule");
      for (let i = 1; i < 6; i ++) {
        let calBox = document.createElement("div");
        calBox.id ="calendarRow";
        this.dates[i].forEach(d => {
          calBox.appendChild(d);
        });
        calBody.appendChild(calBox);
      }
    },

    // the form for which week was selected for week/month view
     _weekSelect: function(e) {
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
          setting.appendChild(form);

          //call function to update
          const weekForm = document.querySelector('#weekOptions');
          weekForm.addEventListener('click', event => {
            this._weekDisplay(event);
          });
        }
      }
      else if (display === "month") {
        // Remmove week options
        if (document.querySelector("#weekOptions")) {
          document.querySelector("#weekOptions").remove();
        }
        this._clearCalendarBox();
        this._reRenderMonth();
      }
    },

    _addNewAppointment: function(name, notes, start, end, type) {
      const app = this.addAppointment(name, notes, start, end, type);
      const eventBox = document.getElementById("appointments");
        let eachBox = document.createElement("div");
        eachBox.id = "app";
        eachBox.innerHTML = app.name.bold() + " - " + this._dateFormater(app.startTime) + " - " + this._dateFormater(app.endTime);
        if (app.notes !== "") {
          eachBox.innerHTML = eachBox.innerHTML + "<br /> <strong>Notes:</strong> " + app.notes;
        }
        eachBox.style.backgroundColor = app.type;
        eventBox.appendChild(eachBox);

        // adding to calendar
        let elements = document.querySelectorAll('#dates');
        for (let n = 0; n < elements.length; n++) {
          let romanToDate = -2;
          let temp = -1;
          if (this.romanNumeral) {
            romanToDate = Calendar.ROMAN.findIndex(roman => roman === elements[n].innerText);
          }
          else {
            temp = elements[n].innerText;
            if (n >= 9) {
                 temp = temp.substring(0,2);
            }
            else {
               temp = temp.substring(0,1);
            }
          }
          if (parseInt(temp) == app.startTime.getDate() || romanToDate + 1 === app[i].startTime.getDate()) {
            let appBox = document.createElement("div");
            appBox.id = "app";
            appBox.innerHTML = app.name.bold() + " - " + this._dateFormater(app.startTime) + " - " + this._dateFormater(app.endTime);
            if (app.notes !== "") {
              appBox.innerHTML = appBox.innerHTML + "<br /> <strong>Notes:</strong> " + app.notes;
            }
            appBox.style.backgroundColor = app.type;
            elements[n].appendChild(appBox);
          }
      }
    },

    _weekDisplay: function(e) {
      e.preventDefault();
      const selected = document.querySelector('#weekNum');
      const weekNum = selected.options[selected.selectedIndex].value;
      this._weekView(weekNum);
    },

    _renderToggleBar: function() {
      const toggleBar = document.getElementById("toggleBar");
      // Apppointment list
      const appListDiv = document.getElementById("appointments");
      const appList = document.createElement("button");
      appList.id = "toggleButton";
      appList.innerText ="List";
      appList.onclick = () => {
        if (appListDiv.firstChild) {
          this.toggleAppList(false);
        }
        else {
          this.toggleAppList(true);
        }
      };
      toggleBar.appendChild(appList);

      // Appointment Form
      const appFormDiv = document.getElementById("addAppointmentForm");
      const appForm = document.createElement("button");
      appForm.id = "toggleButton";
      appForm.innerText ="Form";
      appForm.onclick = () => {
        if (appFormDiv.firstChild) {
          this.toggleAddAppForm(false);
        }
        else {
          this.toggleAddAppForm(true);
        }
      };
      toggleBar.appendChild(appForm);

      // options
      const settingDiv = document.getElementById("setting");
      const settings = document.createElement("button");
      settings.id = "toggleButton";
      settings.innerText ="Setting"
      settings.onclick = () => {
        if (settingDiv.firstChild) {
          this.toggleOptions(false);
        }
        else {
          this.toggleOptions(true);
        }
      };
      toggleBar.appendChild(settings);

      // jump calendar
      const jumpF = document.getElementById("jumpF");
      const jumpForm = document.createElement("button");
      jumpForm.id = "toggleButton";
      jumpForm.innerText ="Jump";
      jumpForm.onclick = () => {
        if (jumpF.firstChild) {
          this.toggleJumpDate(false);
        }
        else {
          this.toggleJumpDate(true);
        }
      };
      toggleBar.appendChild(jumpForm);
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

    // Devs can do
    // Toggle the whole add appointment UI
    toggleAddAppForm: function(toggle) {
      if(toggle) {
        this._renderAddApp();
      }
      else {
        const addAppDiv = document.getElementById("addAppointmentForm");
        while (addAppDiv.firstChild) {
          addAppDiv.removeChild(addAppDiv.lastChild);
        }
      }
    },

    // Devs can do
    // Toggle the whole options UI
    toggleOptions: function(toggle) {
      if(toggle) {
        this._renderSettings();
      }
      else {
        const addAppDiv = document.getElementById("setting");
        while (addAppDiv.firstChild) {
          addAppDiv.removeChild(addAppDiv.lastChild);
        }
      }
    },
    // Devs can do
    // Toggle the whole jump calendar UI
    toggleJumpDate: function(toggle) {
      if(toggle) {
        this._renderJumpDate();
      }
      else {
        const jumpDiv = document.getElementById("jumpF");
        while (jumpDiv.firstChild) {
          jumpDiv.removeChild(jumpDiv.lastChild);
        }
      }
    },

    //Devs can do
    toggleToggleBar: function(toggle) {
      if(toggle) {
        this._renderToggleBar();
      }
      else {
        const bar = document.getElementById("toggleBar");
        while (bar.firstChild) {
          bar.removeChild(bar.lastChild);
        }
      }
    },

    // Devs can do
    // Toggle the whole Appointment list UI
    toggleAppList: function(toggle) {
      if(toggle) {
        const addAppDiv = document.getElementById("appointments");
        this._addToAppList(addAppDiv, this.getAppointments());
      }
      else {
        const addAppDiv = document.getElementById("appointments");
        while (addAppDiv.firstChild) {
          addAppDiv.removeChild(addAppDiv.lastChild);
        }
      }
    },

    // Dev can do
    // bgColour can be a list [colour1, colour2] or a colour hex code
    calendarTheme: function(textColour, bgColour, type) {
      const calBody = document.querySelector('#calendarBody');
      if (type === "solid") {
        calBody.style.backgroundColor = bgColour;
        this.theme = [textColour, bgColour];
      }
      else if (type === "gradient") {
        if (bgColour.length > 2) {
          calBody.style.backgroundImage = "linear-gradient(180deg," +bgColour[0]+ " ,"+ bgColour[1]+" )";
          this.theme = [textColour, bgColour[0], bgColour[1]];
        }
      }
      calBody.style.color = textColour;
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
