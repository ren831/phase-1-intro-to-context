const employees = [
  ["a", "b", "c", 3],
  ["d", "e", "f", 4],
];

function createEmployeeRecord(array) {
  let newObj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return newObj;
}

function createEmployeeRecords(array) {
  return array.map(createEmployeeRecord);
}

console.log(createEmployeeRecords(employees));

function createTimeInEvent(Object, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  hour = parseInt(hour);
  let type = "TimeIn";
  Object.timeInEvents.push({ type, hour, date });
  return Object;
}

function createTimeOutEvent(Object, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  hour = parseInt(hour);
  let type = "TimeOut";
  Object.timeOutEvents.push({ type, hour, date });
  return Object;
}

function hoursWorkedOnDate(Object, workDate) {
  console.log(Object.timeInEvents);

  let inTime = Object.timeInEvents
    .filter((element) => element.date === workDate)
    .map((element) => element.hour);

  let outTime = Object.timeOutEvents
    .filter((element) => element.date === workDate)
    .map((element) => element.hour);

  return (outTime - inTime) / 100;
}

function wagesEarnedOnDate(Object, workdate) {
  return Object.payPerHour * hoursWorkedOnDate(Object, workdate);
}

function allWagesFor(Object) {
  let result = [];
  const allDates = Object.timeInEvents.map(
    (element) => (element = element.date)
  );
  for (let element of allDates) {
    result.push(wagesEarnedOnDate(Object, element));
  }
  return result.reduce((a, b) => a + b, 0);
}

function calculatePayroll(array) {
  return array
    .map((Object) => allWagesFor(Object))
    .reduce((a, b) => (a = a + b), 0);
}
