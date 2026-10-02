const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

function calculateAgeDetailed(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const now = new Date();

  if (Number.isNaN(dob.getTime())) {
    throw new Error("Invalid date format. Use YYYY-MM-DD");
  }

  if (dob > now) {
    throw new Error("Date of birth cannot be in the future.");
  }

  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMs = now.getTime() - dob.getTime();
  const totalSeconds = Math.floor(totalMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    dateOfBirth: dob.toISOString().split("T")[0],
    currentDateTime: now.toISOString()
  };
}

app.get("/", (req, res) => {
  res.json({
    message: "Age Calculator API is running"
  });
});

app.post("/api/age", (req, res) => {
  const { dateOfBirth } = req.body;

  if (!dateOfBirth) {
    return res.status(400).json({
      error: "dateOfBirth is required"
    });
  }

  try {
    const result = calculateAgeDetailed(dateOfBirth);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Age calculator backend running on port ${port}`);
});