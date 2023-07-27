function init() {
    document.getElementById("month").value = "";
    document.getElementById("day").value = "";
    document.getElementById("year").value = "";
}

window.onload = init;
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


function calcStats(day, month, year) {
    // Get current date
    const currentDate = new Date();

    if(leapYear(year)) {
        daysInMonth[1] = 29;
    }

    if(!day || !month || !year) {
        return null;
    }

    // Getting day, month and year from currentDate
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();  

    let diffMonth = monthsOld(month, currentMonth, day, currentDay);
    let diffDay = daysOld(day, currentDay, month);
    let diffYear = yearsOld(year, currentYear, day, currentDay, month, currentMonth);
 
    return {
        diffMonth,
        diffDay,
        diffYear,
    }
}

function daysOld(day, current, month) {
    let difference;

    if(day < current) {
        difference = current - day;
    } else {
        difference = daysInMonth[month - 1] - day + current;
    }

    return difference === daysInMonth[month - 1] ? 0 : difference;
}

function monthsOld(month, currMonth, day, currDay) {
    let monthDifference;

    if(month < currMonth) {
        monthDifference = currMonth - month;
    } else {
        monthDifference = 12 - month + currMonth;
    }

    if(monthDifference === 12) {
        monthDifference = currDay >= day ? 0 : monthDifference - 1;
    }
    return currDay < day ? monthDifference - 1 : monthDifference;
}

function yearsOld(year, currYear, day, currDay, month, currMonth) {
    let yearDifference = currYear - year;
   
    if(month > currMonth) {
        yearDifference -= 1;
    } else if(parseInt(month) === currMonth && day > currDay) {
        yearDifference -= 1;
    }

    return yearDifference;
}

function leapYear(year) {
    if(year % 400 === 0) {
        return true;
    }
    if(year % 4 === 0) {
        return true;
    }
    return false;
}

function formatInput(val, id) {
    let grabInput = document.getElementById(id);
    if(val < 10 && val.length === 1) {
        grabInput.value = `0${val}`;
    }
}

function showError(input, message) {
    const formField = input.parentElement;

    formField.querySelector("input").style.boxShadow = '0 0 5px hsl(0, 100%, 67%)';;
    formField.querySelector("label").classList.add('red')
    const error = formField.querySelector('.error');
    error.textContent = message;
}

function dayCheck(input, val, month) {
    let defaultMax = 31;
    let valid = false;

    if(val.length === 0) {
        showError(input, "This field is required")
    } else if(month.length === 0 && (val > defaultMax || val < 1)) {
        showError(input, "Must be a valid day")
    } else if(month && (val > daysInMonth[month - 1] || val < 1)) {
        showError(input, "Must be a valid day")
    } else {
        valid = true;
    }
    return valid;
}

//
function monthCheck(input, val) {
    let max = 12;
    let valid = false;

    if(val.length === 0){
        showError(input, "This field is required");
    } else if(val > max || val < 1) {
        showError(input, "Must be a valid month")
    }else {
        valid = true;
    }
    return valid;
}

function yearCheck(input, val, day, month) {
    let currYear = new Date().getFullYear();
    
    let valid = false;

    if(val.length === 0) {
        showError(input, "This field is required")
    } else if(currYear < val) {
        showError(input, "Must be in past")
    } else {
        valid = true;
    }
    return valid;

}

function clearError(input, val, val2, val3){
    const formField = input.parentElement;
    
    if(val && val2 && val3) {
        
        formField.querySelector("input").style.boxShadow = 'none';
        formField.querySelector("label").classList.remove("red");
        const error = formField.querySelector('.error');
        error.textContent = "";
    } else if(val) {
        const error = formField.querySelector('.error');
        error.textContent = ""; 
    } 
    
}


const button = document.getElementById("submit");

button.addEventListener("click", event => {
    event.preventDefault();

    // Get input elements
    let monthEl = document.getElementById("month");
    let dayEl = document.getElementById("day");
    let yearEl = document.getElementById("year");

    // Get spans to display info
    let calcYears = document.getElementById("calc-years");
    let calcDays = document.getElementById("calc-days");
    let calcMonths = document.getElementById("calc-months");

    // Get input values
    let month = monthEl.value.trim();
    let day = dayEl.value.trim();
    let year = yearEl.value.trim();

    // Make sure correct input
    let correctDay = dayCheck(dayEl, day, month);
    let correctMonth = monthCheck(monthEl, month);
    let correctYear = yearCheck(yearEl, year, day, month);
    
    // clear errors if correct
    clearError(monthEl, correctMonth, correctDay, correctYear);
    clearError(dayEl, correctDay, correctMonth, correctYear);
    clearError(yearEl, correctYear, correctDay, correctMonth);

    if(!correctDay || !correctMonth || !correctYear) {
        calcYears.innerHTML = "--";
        calcDays.innerHTML = "--";
        calcMonths.innerHTML = "--";
        return;
    }
    const ageObj = calcStats(day, month, year);

    

    // Format inputs so single digits have 0 on front
    formatInput(month, "month");
    formatInput(day, "day");
    
    if(ageObj){
        calcYears.innerHTML = ageObj.diffYear;
        calcDays.innerHTML = ageObj.diffDay;
        calcMonths.innerHTML = ageObj.diffMonth; 
    }     
})