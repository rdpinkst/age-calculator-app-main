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

    if(!day && !month && !year) {
        return;
    }

    // Getting day, month and year from currentDate
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let diffMonth, diffYear, diffDay;
    
    if(parseInt(month) < currentMonth) {
        diffMonth = currentMonth - month;
        diffYear = currentYear - year;
    } else if (parseInt(month) === currentMonth && day < currentDay){
        diffYear = currentYear - year;
        diffMonth = (12 - month) + currentMonth;
    }else {
        diffMonth = (12 - month) + currentMonth;
        diffYear = currentYear - year - 1;
    }
    if(diffMonth === 12 && currentDay >= day) {
        diffMonth = 0;
    } else if(diffMonth === 12 && currentDay < day) {
        diffMonth -= 1;
    }

    if(day < currentDay) {
        diffDay = currentDay - day;
    } else {
        diffDay = daysInMonth[currentMonth - 1] - day + currentDay;
    }

    
    return {
        diffMonth,
        diffDay,
        diffYear,
    }
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

    const error = formField.querySelector('.error');
    error.textContent = message;
}

function dayCheck(input, val, month) {
    let defaultMax = 31;
    let valid = false;

    if(val.length === 0) {
        showError(input, "This field is required")
    } else if(month.length === 0 && val > defaultMax) {
        showError(input, "Must be a valid day")
    } else if(month && val > daysInMonth[month - 1]) {
        showError(input, "Must be a valid day")
    } else {
        valid = true;
    }
    return valid;
}

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
    console.log(currYear > val)
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

function clearError(input, correct){
    const formField = input.parentElement;
    if(correct) {
        const error = formField.querySelector('.error');
        error.textContent = ""; 
    }
    
}


const button = document.getElementById("submit");

button.addEventListener("click", event => {
    event.preventDefault();

    // Get input values;
    let monthEl = document.getElementById("month");
    let dayEl = document.getElementById("day");
    let yearEl = document.getElementById("year");

    let month = monthEl.value.trim();
    let day = dayEl.value.trim();
    let year = yearEl.value.trim();
    
    let correctDay = dayCheck(dayEl, day, month);
    let correctMonth = monthCheck(monthEl, month);
    let correctYear = yearCheck(yearEl, year, day, month);
    
    // clear errors if correct
    clearError(monthEl, correctMonth);
    clearError(dayEl, correctDay);
    clearError(yearEl, correctYear);
    
    if(!correctDay || !correctMonth || !correctYear) {
        return;
    }
    const ageObj = calcStats(day, month, year);

    

    // Format inputs so single digits have 0 on front
    formatInput(month, "month");
    formatInput(day, "day");

    if(ageObj){
        // Get spans to display info
        let calcYears = document.getElementById("calc-years");
        let calcDays = document.getElementById("calc-days");
        let calcMonths = document.getElementById("calc-months");

        calcYears.innerHTML = ageObj.diffYear;
        calcDays.innerHTML = ageObj.diffDay;
        calcMonths.innerHTML = ageObj.diffMonth; 
    }
    
})