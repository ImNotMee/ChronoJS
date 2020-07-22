let appointmentID = 0;
let appointments = [];

class Appointment {
  constructor(name, notes, start, end, type) {
    this.id = appointmentID;
    this.name = name;
    this.notes = notes;
    this.startTime = new Date(start);
    this.endTime = new Date(end);
    this.type = type;
    appointmentID ++;
  }
}

const appAddForm = document.querySelector('#appAddForm');
appAddForm.addEventListener('submit', addAppointment);

function addAppointment(e) {
  e.preventDefault();
  const name = document.querySelector('#newAppName').value;
  const start = document.querySelector('#newAppStartTime').value;
  const end = document.querySelector('#newAppEndTime').value;
  const notes = document.querySelector('#newAppNotes').value;
  const selected = document.querySelector('#newAppType');
  const type = selected.options[selected.selectedIndex].value;

  const app = new Appointment(name, notes, start, end, type);
  appointments.push(app);
}
