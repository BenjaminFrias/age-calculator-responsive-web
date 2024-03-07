const day = document.getElementById('day');    
const month = document.getElementById('month');
const year = document.getElementById('year');  

const formField = document.querySelectorAll('.form-field');
const icon = document.querySelector('#icon');

// Get the span elements
const yearSpan = document.querySelector('#span-years');
const monthSpan = document.querySelector('#span-months');
const daySpan = document.querySelector('#span-days');


document.querySelector('#button-form').addEventListener('click', function (event) {

    // Check if the checkForm function return data
    let result = checkForm();
    if (result) {
        let days = result[0]; 
        let months = result[1];
        let years = result[2]; 

        yearSpan.innerHTML = years;
        monthSpan.innerHTML = months;
        daySpan.innerHTML = days;

    }
});

function errorMessage(msg, field) {
    // Create p error message
    let message = document.createElement('p');
    message.innerHTML = msg;
    message.setAttribute("style", "margin-top: 5px; color: var(--LightRed); font-size: 1.2rem; font-weight: 400; font-style: italic;"); 
    message.classList.add('errorMessage');


    // Set label color to red
    if (field.length > 1) { // Set all field to red color
        field.forEach(f => {
            f.querySelector('label').setAttribute("style", "color: var(--LightRed)");
            f.querySelector('input').setAttribute("style", "border-color: var(--LightRed)");
        });
    } // Color only the field
    else {
        field.querySelector('input').setAttribute("style", "border-color: var(--LightRed)");
        field.querySelector('label').setAttribute("style", "color: var(--LightRed)");
    }

    return message;
}

function checkForm() {

    let isValid = true;

    // Check every field
    formField.forEach(field => {

        // Restore the style of inputs
        field.querySelector('label').setAttribute("style", "color: var(--LightGray);");
        field.querySelector('input').setAttribute("style", "border-color: var(--LightGrey);");

        // Check if there is an error msg and remove it
        if (field.querySelector('.errorMessage') != null) {
            let errorMsg =  field.querySelector('.errorMessage');
            errorMsg.remove();
        }
        
        // Check if the input is blank
        if (field.querySelector('input').value === '') {
            isValid = false;
            field.appendChild(errorMessage('This field is required', field));
        }

    });

    // Get the values of date
    let dayValue = parseInt(day.value);
    let monthValue = parseInt(month.value);
    let yearValue = parseInt(year.value);


    // Check if day is less than 1
    if (dayValue < 1) {
        isValid = false;
        formField[0].appendChild(errorMessage('Must be a valid day', formField[0]));
    } // Check if day is valid if month is february
    else if (dayValue > 28 && monthValue === 2) {
        isValid = false;
        formField[0].appendChild(errorMessage('Must be a valid day', formField[0]));
    } // Check if day is valid if month is April, June, September, November
    else if (dayValue > 30 && [4, 6, 9, 11].includes(monthValue)) {
        isValid = false;
        formField[0].appendChild(errorMessage('Must be a valid day', formField[0]));
    } // Check if the day more than 31 for the rest of months
    else if (dayValue > 31) {
        isValid = false;
        formField[0].appendChild(errorMessage('Must be a valid day', formField[0]));
    }

    // Check if month is valid
    if (monthValue > 12 || monthValue < 1) {
        isValid = false;
        formField[1].appendChild(errorMessage('Must be a valid month', formField[1]));
    }

    // Get current date
    let today = new Date()
    let yyyy = today.getFullYear();
    
    // Check if Year is valid
    if (yearValue < 1) {
        isValid = false;
        formField[2].appendChild(errorMessage('Invalid year', formField[2]));
    }

    // Get today date
    let currentDay = today.getDate();
    let currentMonth = today.getMonth() + 1;
    let currentYear = today.getFullYear();

    // Get the results
    // Get the results
    let dateInput = new Date(`${monthValue}/${dayValue}/${yearValue}`);
    let currentDate = new Date(`${currentMonth}/${currentDay}/${currentYear}`);

    // Validate if the date is in the future
    if (dateInput > currentDate) {
        isValid = false;
        formField[2].appendChild(errorMessage('Must be in the past', formField[2]));
    }

    // Get the difference in years
    let Difference_In_Year = currentDate.getFullYear() - dateInput.getFullYear();

    // Adjust the difference if the input date is later in the year than the current date
    if (dateInput.getMonth() > currentDate.getMonth() || (dateInput.getMonth() == currentDate.getMonth() && dateInput.getDate() > currentDate.getDate())) {
    Difference_In_Year--;
    }

    // Get the difference in months
    let Difference_In_Months = currentDate.getMonth() - dateInput.getMonth();

    // Adjust the difference if the input date is later in the month than the current date
    if (dateInput.getDate() > currentDate.getDate()) {
    Difference_In_Months--;
    }

    // If the difference is negative, add 12 months
    if (Difference_In_Months < 0) {
    Difference_In_Months += 12;
    }

    // Get the difference in days
    let Difference_In_Days = currentDate.getDate() - dateInput.getDate();

    // If the difference is negative, get the number of days in the previous month and add it
    if (Difference_In_Days < 0) {
    let prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    let daysInPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();
    Difference_In_Days += daysInPrevMonth;
    }

    const remainingMonths = Difference_In_Months;
    const remainingDays = Difference_In_Days;
    
    if (isValid) {
        return [remainingDays, remainingMonths, Difference_In_Year];
    }
    else {
        return false;
    }

}