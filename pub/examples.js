const apps = [
  {  id: 0,
    name: "Doctor's Appointment",
    notes: "leave 16 mins early",
    startTime: new Date(2020,7, 16, 11,0),
    endTime: new Date(2020,7, 16, 12, 30),
    type: "urgent"
  },
  {
    id: 1,
    name: "Family Dinner",
    notes: "buy gifts",
    startTime: new Date(2020,7, 11,18,0),
    endTime: new Date(2020, 7,11,21, 30),
    type: "important"
  },
  {
    id: 2,
    name: "Meeting with Friends",
    notes: "Playing Pool",
    startTime: new Date(2020,5, 1),
    endTime: new Date(2020, 5,1),
    type: "important"
  },
  {
    id: 3,
    name: "Final Exam",
    notes: "",
    startTime: new Date(2020,6, 11, 3, 20, 0),
    endTime: new Date(2020, 6,11, 7, 30, 0),
    type: "important"
  },
  {
    id: 4,
    name: "enjoying the sun",
    notes: "hiking",
    startTime: new Date(2020,7, 28, 10, 0),
    endTime: new Date(2020, 7,28,17,0),
    type: "notImportant"
  },
  {
    id: 5,
    name: "Pick Up Kids from class",
    notes: "",
    startTime: new Date(2020,8, 1, 18, 0),
    endTime: new Date(2020, 8, 1, 18, 0),
    type: "urgent"
  }
];

// renderAddApp: function() {
//   const addAppBox = document.getElementById("addAppointmentForm");
//   const appAddForm = document.createElement("form");
//   appAddForm.id = "appAddForm"
//   const newAppName = document.createElement("input");
//   newAppName.type="text";
//   newAppName.maxlength = "40";
//   newAppName.id ="newAppName";
//   const newAppStartDate = document.createElement("input");
//   newAppStartDate.type="text";
//   newAppStartDate.maxlength = "10";
//   newAppStartDate.id ="newAppStartDate";
//   newAppStartDate.placeholder ="YYYY-MM-DD"
//   const newAppStartTime = document.createElement("input");
//   const newAppEndTime = document.createElement("input");
//   newAppStartTime.type="time";
//   newAppEndTime.type="time";
//   newAppStartTime.id ="newAppStartTime";
//   newAppEndTime.id ="newAppEndTime";
//   const newAppNotes = document.createElement("input");
//   newAppNotes.type="text";
//   newAppNotes.maxlength = "70";
//   newAppNotes.id= "newAppNotes";
//
//   const label1 = document.createElement("label");
//   const label2 = document.createElement("label");
//   const label3 = document.createElement("label");
//   const label4 = document.createElement("label");
//   const label5 = document.createElement("label");
//   label1.innerText = "Name:";
//   label2.innerText = "Start Date:";
//   label3.innerText = "Start Time:";
//   label4.innerText = "End Time:";
//   label5.innerText = "Notes:";
//   appAddForm.appendChild(label1);
//   appAddForm.appendChild(newAppName);
//   appAddForm.appendChild(label2);
//   appAddForm.appendChild(newAppStartDate);
//   appAddForm.appendChild(label3);
//   appAddForm.appendChild(newAppStartTime);
//   appAddForm.appendChild(label4);
//   appAddForm.appendChild(newAppEndTime);
//   appAddForm.appendChild(label5);
//   appAddForm.appendChild(newAppNotes);
//
//   const label6 = document.createElement("label");
//   label6.innerText ="Type:";
//   appAddForm.appendChild(label6);
//   const newAppType = document.createElement("select");
//   const option1 = document.createElement("option");
//   option1.value="important";
//   option1.innerText = "Important";
//   option1.selected = true;
//   const option2 = document.createElement("option");
//   option2.value="notImportant";
//   option2.innerText = "Not Important";
//   const option3 = document.createElement("option");
//   option3.value="urgent";
//   option3.innerText = "Urgent";
//   newAppType.appendChild(option1);
//   newAppType.appendChild(option2);
//   newAppType.appendChild(option3);
//   appAddForm.appendChild(newAppType);
//
//   const submit = document.createElement("input");
//   submit.type ="submit";
//   submit.value = "Add Appointment";
//   appAddForm.appendChild(submit);
//   addAppBox.appendChild(appAddForm);

  const cMonth = 7;
  const cyear = 2020;
  const calen = new Calendar(cyear, cMonth);
  calen.loadAppointments(apps);
  calen.startCalendar();
