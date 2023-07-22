
function calcStats(day, month, year) {
    // Get current date
    const currentDate = new Date();

    // Getting day, month and year from currentDate
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    let diffMonth, diffYear, diffDay;
    
    if(month < currentMonth) {
        diffMonth = currentMonth - month;
        diffYear = currentYear - year;
    } else {
        diffMonth = (12 - month) + currentMonth;
        diffYear = currentYear - year - 1;
    }

    // diffDay = currentDay - day
    
    
}


const button = document.getElementById("submit");

button.addEventListener("click", event => {
    event.preventDefault();

    // Get input values;
    let month = document.getElementById("month").value;
    let day = document.getElementById("day").value;
    let year = document.getElementById("year").value;

    const ageObj = calcStats(day, month, year);

    
    console.log(month);
})