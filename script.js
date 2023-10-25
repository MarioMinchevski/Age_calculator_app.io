'use strict';

const date = new Date();

let currentDay = date.getDate();
let currentMonth = date.getMonth() + 1;
let currentYear = date.getFullYear();

const form = document.querySelector('.form');
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

const yearsResult = document.getElementById('years-result');
const monthsResult = document.getElementById('months-result');
const daysResult = document.getElementById('days-result');

function calculateAge(birthDay, birthMonth, birthYear) {
    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;
    let days = currentDay - birthDay;

    if (days < 0) {
        months--;
        const daysInLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
        days += daysInLastMonth;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // leap year
    if (birthYear % 4 === 0 && (birthYear % 100 !== 0 || birthYear % 400 === 0)) {
        daysInMonth[1] = 29;
    }

    yearsResult.textContent = years;
    monthsResult.textContent = months;
    daysResult.textContent = days;
}

function setError(input, message) {
    const inputControl = input.parentElement;
    const displayMessage = inputControl.querySelector('.message');

    displayMessage.textContent = message;
    inputControl.classList.add('error');
}

function setSuccess(input) {
    const inputControl = input.parentElement;
    const displayMessage = inputControl.querySelector('.message');

    displayMessage.textContent = '';
    inputControl.classList.remove('error');
}

function validateDay(value) {
    if (/[^0-9]/.test(value)) {
        return false;
    }
    return value >= 1 && value <= 31;
}

function validateMonth(value) {
    if (/[^0-9]/.test(value)) {
        return false;
    }
    return value >= 1 && value <= 12;
}

function validateYear(value) {
    if (/[^0-9]/.test(value) || value <= 0 || value > currentYear) {
        return false;
    }
    return value;
}

// check if month has appropirate num od days 
function isValidDayMonthCombo(day, month, year) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        daysInMonth[1] = 29;
    }

    return day <= daysInMonth[month - 1];
}

function validateInputs() {
    const dayValue = day.value.trim();
    const monthValue = month.value.trim();
    const yearValue = year.value.trim();

    if (dayValue === '') {
        setError(day, "This field is required.");
    } else if (!validateDay(dayValue) || !isValidDayMonthCombo(dayValue, monthValue, yearValue)) {
        setError(day, "Must be a valid day.");
    } else {
        setSuccess(day);
    }

    if (monthValue === '') {
        setError(month, "This field is required.");
    } else if (!validateMonth(monthValue)) {
        setError(month, "Must be a valid month.");
    } else {
        setSuccess(month);
    }

    if (yearValue === '') {
        setError(year, "This field is required.");
    } else if (!validateYear(yearValue)) {
        setError(year, "Must be a valid year.");
    } else {
        setSuccess(year);
    }

    const allInputsAreSuccessful =
        dayValue !== "" &&
        validateDay(dayValue) &&
        isValidDayMonthCombo(dayValue, monthValue, yearValue) &&
        monthValue !== "" &&
        validateMonth(monthValue) &&
        yearValue !== "" &&
        validateYear(yearValue);

    if (allInputsAreSuccessful) {
        calculateAge(dayValue, monthValue, yearValue);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateInputs();
});
