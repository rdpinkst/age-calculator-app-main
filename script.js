// day, month, year
function calcStats() {
    // Get current date
    const currentDate = new Date();

    // Getting day, month and year from currentDate
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    console.log(currentYear);
}
calcStats();

const button = document.getElementById("submit");

button.addEventListener("click", event => {
    event.preventDefault();
    console.log("Clicked")
})