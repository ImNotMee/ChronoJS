const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let today = {year:2020,month: 6};

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
}

const addThisMonthAppointments = () => {
  
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
}

const renderDates = () => {
  const currMonthData = getMonthData();
  console.log(currMonthData);
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
  month.innerHTML = currMonth;
  console.log(today);
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
