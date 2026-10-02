const dobInput = document.getElementById("dob");
const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");
const error = document.getElementById("error");

const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");

const totalDaysEl = document.getElementById("totalDays");
const totalHoursEl = document.getElementById("totalHours");
const totalMinutesEl = document.getElementById("totalMinutes");
const totalSecondsEl = document.getElementById("totalSeconds");

const liveHoursEl = document.getElementById("liveHours");
const liveMinutesEl = document.getElementById("liveMinutes");
const liveSecondsEl = document.getElementById("liveSeconds");

const dobDisplayEl = document.getElementById("dobDisplay");
const currentDateTimeEl = document.getElementById("currentDateTime");

dobInput.max = new Date().toISOString().split("T")[0];

calculateBtn.addEventListener("click", calculateAge);
dobInput.addEventListener("change", calculateAge);

function calculateAge() {
  const dobValue = dobInput.value;

  if (!dobValue) {
    showError("Please select your date of birth.");
    return;
  }

  const dob = new Date(dobValue);
  const now = new Date();

  if (dob > now) {
    showError("Date of birth cannot be in the future.");
    return;
  }

  hideError();
  result.classList.remove("hidden");

  const age = getAgeParts(dob, now);
  const totalSeconds = Math.floor((now.getTime() - dob.getTime()) / 1000);

  yearsEl.textContent = age.years;
  monthsEl.textContent = age.months;
  daysEl.textContent = age.days;

  totalDaysEl.textContent = Math.floor(totalSeconds / 86400).toLocaleString();
  totalHoursEl.textContent = Math.floor(totalSeconds / 3600).toLocaleString();
  totalMinutesEl.textContent = Math.floor(totalSeconds / 60).toLocaleString();
  totalSecondsEl.textContent = totalSeconds.toLocaleString();

  dobDisplayEl.textContent = dob.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  updateLiveAge(dob);
  updateCurrentTime();

  setInterval(() => {
    updateLiveAge(dob);
    updateCurrentTime();
  }, 1000);
}

function getAgeParts(dob, now) {
  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

function updateLiveAge(dob) {
  const now = new Date();
  const diff = now.getTime() - dob.getTime();

  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor((totalSeconds / 3600) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = totalSeconds % 60;

  liveHoursEl.textContent = String(hours).padStart(2, "0");
  liveMinutesEl.textContent = String(minutes).padStart(2, "0");
  liveSecondsEl.textContent = String(seconds).padStart(2, "0");
}

function updateCurrentTime() {
  const now = new Date();
  currentDateTimeEl.textContent = now.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function showError(msg) {
  error.textContent = msg;
  error.classList.remove("hidden");
  result.classList.add("hidden");
}

function hideError() {
  error.classList.add("hidden");
}