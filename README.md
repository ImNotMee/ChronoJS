# ChronoJS

Link to landing page: https://chronojs.herokuapp.com/index.html

Documentation Link: https://chronojs.herokuapp.com/documentation.html

# Getting started:

To initalize the calendar module:

```
    const cMonth = 7; // 7 = August
    const cyear = 2020; // current year is 2020
    const calen = new Calendar(cyear, cMonth);
    calen.startCalendar();
```

To load in appointments you must have a list of Appointments objects:
Example of how the list would look like:

```
  const apps = [
      {  
        name: "Example 1",
        notes: "",
        startTime: new Date(2020, 7, 16, 11,0), // (year, month, day, hour, minutes, seconds)
        endTime: new Date(2020,7, 16, 12, 30), // (year, month, day, hour, minutes, seconds)
        type: "urgent"
      },
      {
        name: "Example 2",
        notes: "Optional Notes",
        startTime: new Date(2020,7, 11,18,0), // (year, month, day, hour, minutes, seconds)
        endTime: new Date(2020, 7,11,21, 30), // (year, month, day, hour, minutes, seconds)
        type: "important"
      }]

      // to load in the appointments, simply use this method (calen is the calendar object)
      calen.loadAppointments(app);
```
Or by using the `addAppointment` function

```
  const startTime = new Date(2020,7, 21,22,0);
  const endTime = new Date(2020,7, 21, 23,0);
  calen.addAppointment("Example 3", "no notes", startTime, endTime, "important");
```

Note: if the Start time and end time is the exact same, it will render "All day" as the time.
```
  // example appointment object that will show All Day
  {
    name: "Sleep",
    notes: "AT HOME",
    startTime: new Date(2020,7, 1, 1, 10),
    endTime: new Date(2020, 7, 1, 1, 10),
    type: "urgent"
  }
```

When first initalize the calendar all the UI elements will display.
To remove any of the UI elements from displaying, refer to the toggle functions.

```
   // Example of removing the options element from the module
   calen.toggleOptions(false);
```

## Calendar and Appointment Object
### Appointment
Creates an Appointment Object
```
  new Appointment(name, notes, startTime, endTime, type);
```

| variable  | Type   | Description                                           |
|-----------|--------|-------------------------------------------------------|
| name      | String | The name of the event/appointment                     |
| notes     | String | Any additional details for this appointment/event     |
| startTime | Date   | The starting time of the event/appointment            |
| endTime   | Date   | The end time of the event/appointment                 |
| type      | String | Type of appointment (important, notImportant, urgent) |

### Calendar
Creates the Calendar object
```
    new Calendar(year, month);
```
| variable  | Type   | Description                                           |
|-----------|--------|-------------------------------------------------------|
| year      | int | The year for the calendar to start                     |
| month     | int | The month for the calendar to start (0 = Jan ... 11 = Dec)     |

# Calendar API
### startCalendar
Functionality: initializes the calendar and renders it.
```
startCalendar();
```

### addAppointment
Functionality: Adds a new appointment into the calendar object.
```
addAppointment(name, notes, start, end, type);
```
| variable  | Type   | Description                                           |
|-----------|--------|-------------------------------------------------------|
| name      | String | The name of the event/appointment                     |
| notes     | String | Optional details for this appointment/event     |
| startTime | Date   | The new start time for the appointment (YYYY-MM-DDTHH:MM)           |
| endTime   | Date   | The new end time for the appointment (YYYY-MM-DDTHH:MM)             |
| type      | String | Type of appointment (important, notImportant, urgent) |

### deleteAppointment
Functionality: Removes the appointment from the list of appointments

```
deleteAppointment(appID);
```
| variable  | Type   | Description                          |
|-----------|--------|--------------------------------------|
| appID     | int    | the Appointment ID                   |

### getAppointments
Functionality: gets a list of appointments for current calendar month.
```
getAppointments();
```

### editAppointments
Functionality: Edit an existing appointment.

```
editAppointments(id, name, notes, startTime, endTime, type);
```
  | variable  | Type   | Description                                           |
  |-----------|--------|-------------------------------------------------------|
  | name      | String | The name of the event/appointment                     |
  | notes     | String | Optional details for this appointment/event     |
  | startTime | Date   | The new start time for the appointment (YYYY-MM-DDTHH:MM)           |
  | endTime   | Date   | The new end time for the appointment (YYYY-MM-DDTHH:MM)             |
  | type      | String | Type of appointment (important, notImportant, urgent) |

### loadAppointments
Functionality: Loads the list of appointments into the calendar.
```
loadAppointments(appointments);
```
| variable      | Type   | Description                                           |
|---------------|--------|-------------------------------------------------------|
| appointments  | Array  | A list of Appointment Objects                         |

### alertAppointments
Functionality: Alerts the user when there are appointments within 1 hour.
```
alertAppointments();
```
### toggleAddAppForm
Functionality: To toggle the UI for the add appointments Form.
```
toggleAddAppForm(toggle);
```
| variable  | Type     | Description                                           |
|-----------|----------|-------------------------------------------------------|
| toggle    | boolean  | A true or false input to indicate on/off              |

### toggleOptions
Functionality: To toggle the UI for the Settings.
```
toggleOptions(toggle);
```
| variable  | Type     | Description                                           |
|-----------|----------|-------------------------------------------------------|
| toggle    | boolean  | A true or false input to indicate on/off              |

### toggleAppList
Functionality: To toggle the UI for the Appointment list.
```
toggleAppList(toggle);
```
| variable  | Type     | Description                                           |
|-----------|----------|-------------------------------------------------------|
| toggle    | boolean  | A true or false input to indicate on/off              |

### toggleJumpDate
Functionality: To toggle the UI for custom month jumps in calendar.
```
toggleJumpDate(toggle);
```
| variable  | Type     | Description                                           |
|-----------|----------|-------------------------------------------------------|
| toggle    | boolean  | A true or false input to indicate on/off              |

### toggleToggleBar
Functionality: To toggle the UI for the toggle bar.
```
toggleToggleBar(toggle);
```
| variable  | Type     | Description                                           |
|-----------|----------|-------------------------------------------------------|
| toggle    | boolean  | A true or false input to indicate on/off              |

### calendarTheme
Functionality: To set a custom theme for the calendar.
```
calendarTheme(textColour, bgColour, type);
```
| variable  | Type   | Description                                           |
|-----------|--------|-------------------------------------------------------|
| textColour   | String | A hex colour p in the form of a string for text colour.                     |
| bgColour     | String/Array of String | A single hex colour for a solid colour effect and a two hex colours in a list for a gradient effect.     |
| type         | String | To indicate whether it is a solid or a gradient effect (solid, gradient) |
