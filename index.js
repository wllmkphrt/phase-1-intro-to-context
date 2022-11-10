function createEmployeeRecord(employeeInfo){
    const employeeRecord = {
        firstName : employeeInfo[0],
        familyName : employeeInfo[1],
        title : employeeInfo[2],
        payPerHour : employeeInfo[3],
        timeInEvents : [],
        timeOutEvents : []
    }
    return employeeRecord;
}

function createEmployeeRecords(infoArrays){
    return infoArrays.map(createEmployeeRecord);
}

function createTimeInEvent(record, date){
    const timeInEvent = {
        type : 'TimeIn',
        hour : parseInt(date.slice(11)),
        date : date.slice(0, 10)
    }
    record.timeInEvents.push(timeInEvent);
    return record;
}

function createTimeOutEvent(record, date){
    const timeOutEvent = {
        type : 'TimeOut',
        hour : parseInt(date.slice(11)),
        date : date.slice(0, 10)
    }
    record.timeOutEvents.push(timeOutEvent);
    return record;
}

function hoursWorkedOnDate(record, date){
    const clockIn = record.timeInEvents.filter(clock => Object.values(clock).includes(date));
    const clockOut = record.timeOutEvents.filter(clock => Object.values(clock).includes(date));
    const hours = clockIn.map((element, index) => (clockOut[index].hour-element.hour)/100);
    return hours.reduce(function(total, currentValue){return total + currentValue});
}

function wagesEarnedOnDate(record, date){
    return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record){
    const allDates = record.timeInEvents.map(element => element.date);
    const allUniqueDates = [...new Set(allDates)];
    const wagesArr = allUniqueDates.map(element => wagesEarnedOnDate(record, element));
    return wagesArr.reduce(function(total, currentValue){return total + currentValue});
}

function calculatePayroll(employees){
    const allWages = employees.map(element => allWagesFor(element));
    return allWages.reduce(function(total, currentValue){return total + currentValue});
}

