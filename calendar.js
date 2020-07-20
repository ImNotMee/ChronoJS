const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getMonthData = () => {
  let d = new Date();
  const firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
  const numOfDays = new Date(d.getFullYear(), d.getMonth(), 0);
  return [firstDay.getDay(), numOfDays.getDate()];
};

const getMonth = () => {
  let d = new Date();
  let months = MONTHS;
  return months[d.getMonth()];
};

const renderCalendar = () => {
  const currMonth = getMonth();
  const currMonthData = getMonthData();
  // For setting up the grid based on month
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

renderCalendar();
