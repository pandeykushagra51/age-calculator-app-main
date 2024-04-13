document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img"); // Replace ".your-image-class" with the appropriate class selector for your image(s)
  images.forEach((image) => {
    image.addEventListener("click", function () {
      const day = document.querySelector("#day").value;
      const months = document.querySelector("#month").value;
      const year = document.querySelector("#year").value;

      const monthValidation = isValidMonth(months);
      const dayValidation = isValidDay(day, months);
      const yearValidation = isValidYear(year);

      if (
        monthValidation.isValid &&
        dayValidation.isValid &&
        yearValidation.isValid
      ) {
        const age = calculateAge(day, months, year);
        console.log({ age });
        document.querySelector("#years").textContent = age.years;
        document.querySelector("#months").textContent = age.months;
        document.querySelector("#days").textContent = age.days;
      }

      if (!monthValidation.isValid) {
        document.querySelector("#month-error").textContent =
          monthValidation.message;
      } else {
        document.querySelector("#month-error").textContent = "";
      }
      if (!dayValidation.isValid) {
        document.querySelector("#day-error").textContent =
          dayValidation.message;
      } else {
        document.querySelector("#day-error").textContent = "";
      }
      if (!yearValidation.isValid) {
        document.querySelector("#year-error").textContent =
          yearValidation.message;
      } else {
        document.querySelector("#year-error").textContent = "";
      }

      // console.log({ day, months, year });
    });
  });
});

function isValidMonth(month) {
  if (month === "")
    return { isValid: false, message: "This field is required" };
  if (isNaN(month))
    return { isValid: false, message: "Month must be a number" };
  if (month > 0 && month <= 12) {
    return { isValid: true, message: "" };
  }
  return { isValid: false, message: "Must be a valid month" };
}

const monthDayMapper = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

function isValidDay(day, month) {
  if (isValidMonth(month).isValid === false) month = 1;
  if (day === "") return { isValid: false, message: "This field is required" };
  if (isNaN(day)) return { isValid: false, message: "Day must be a number" };
  if (day > 0 && day <= monthDayMapper[month]) {
    return { isValid: true, message: "" };
  }
  return { isValid: false, message: "Must be a valid day" };
}

function isValidYear(year) {
  if (year === "") return { isValid: false, message: "This field is required" };
  if (isNaN(year)) return { isValid: false, message: "Year must be a number" };
  if (year > 0 && year <= new Date().getFullYear()) {
    return { isValid: true, message: "" };
  }
  return { isValid: false, message: "Must be a valid year" };
}

function calculateAge(day, month, year) {
  // Get the current date
  var currentDate = new Date();

  // Calculate the difference in years
  var age = currentDate.getFullYear() - year;

  // Check if the birthday hasn't occurred yet this year
  if (
    currentDate.getMonth() < month - 1 ||
    (currentDate.getMonth() === month - 1 && currentDate.getDate() < day)
  ) {
    age--;
  }

  // Calculate the difference in months
  var currentMonth = currentDate.getMonth() + 1;
  var months = currentMonth - month;
  if (months < 0) {
    age--;
    months = 12 + months;
  }

  // Calculate the difference in days
  var days = currentDate.getDate() - day;
  if (days < 0) {
    months--;
    var daysInLastMonth = new Date(
      currentDate.getFullYear(),
      currentMonth - 1,
      0
    ).getDate();
    days = daysInLastMonth + days;
  }

  return { years: age, months: months, days: days };
}
