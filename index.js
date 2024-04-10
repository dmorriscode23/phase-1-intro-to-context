// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }

  function createTimeInEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return employeeRecord;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    const inEvent = employeeRecord.timeInEvents.find(e => e.date === date);
    const outEvent = employeeRecord.timeOutEvents.find(e => e.date === date);
    return (outEvent.hour - inEvent.hour) / 100;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  function allWagesFor(employeeRecord) {
    const totalWages = employeeRecord.timeInEvents.reduce((total, curr) => {
      return total + wagesEarnedOnDate(employeeRecord, curr.date);
    }, 0);
    return totalWages;
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
      return total + allWagesFor(record);
    }, 0);
  }
  