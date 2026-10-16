
const dobInput = document.getElementById("dob");
const calculateBtn = document.getElementById("calculateBtn");
const errorDiv = document.getElementById("error");
const resultDiv = document.getElementById("result");

let liveTimer;

calculateBtn.addEventListener("click", async () => {
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
  resultDiv.classList.add("hidden");

  if (!dobInput.value) {
    errorDiv.textContent = "Please select your date of birth.";
    errorDiv.classList.remove("hidden");
    return;
  }

  try {
    calculateBtn.disabled = true;
    calculateBtn.textContent = "Calculating...";

    const response = await fetch("http://localhost:3000/api/age", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dateOfBirth: dobInput.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not calculate age.");
    }

    document.getElementById("years").textContent = data.years;
    document.getElementById("months").textContent = data.months;
    document.getElementById("days").textContent = data.days;

    document.getElementById("totalDays").textContent =
      data.totalDays.toLocaleString();

    document.getElementById("totalHours").textContent =
      data.totalHours.toLocaleString();

    document.getElementById("totalMinutes").textContent =
      data.totalMinutes.toLocaleString();

    document.getElementById("totalSeconds").textContent =
      data.totalSeconds.toLocaleString();

    document.getElementById("dobDisplay").textContent =
      data.dateOfBirth;

    document.getElementById("currentDateTime").textContent =
      new Date(data.currentDateTime).toLocaleString();

    resultDiv.classList.remove("hidden");

    // Live clock
    clearInterval(liveTimer);

    function updateLiveClock() {
      const birthDate = new Date(dobInput.value + "T00:00:00");
      const elapsed = Math.max(
        0,
        Math.floor((Date.now() - birthDate.getTime()) / 1000)
      );

      document.getElementById("liveHours").textContent =
        String(Math.floor(elapsed / 3600) % 24).padStart(2, "0");

      document.getElementById("liveMinutes").textContent =
        String(Math.floor(elapsed / 60) % 60).padStart(2, "0");

      document.getElementById("liveSeconds").textContent =
        String(elapsed % 60).padStart(2, "0");
    }

    updateLiveClock();
    liveTimer = setInterval(updateLiveClock, 1000);

  } catch (error) {
    errorDiv.textContent =
      error.message === "Failed to fetch"
        ? "Cannot connect to the backend. Please start your server."
        : error.message;

    errorDiv.classList.remove("hidden");
  } finally {
    calculateBtn.disabled = false;
    calculateBtn.textContent = "Calculate Age";
  }
});
