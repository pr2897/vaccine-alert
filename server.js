console.log("Executing");
require("dotenv").config();
const axios = require("axios").default;

const RECEIVERS = ["your mobile number eg: +911234567890"];

const sendTextMessage = require("./twilio");
const sendMessage = require("./send_message");

const currentDate = JSON.stringify(
  new Date(new Date().valueOf() + 1000 * 3600 * 24)
)
  .split("T")[0]
  .substr(1)
  .split("-");
const date = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`;

const PINCODE = "851204";

const VACCINE_AVAILABILITY_CHECK_URL = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode=${PINCODE}&date=${date}`;

async function getVaccineAvailability() {
  try {
    let availableDose = 0;
    const data = await axios.get(VACCINE_AVAILABILITY_CHECK_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
      },
    });

    let response = `<b>Vaccine Slot Availability Alert</b> <hr>`;

    const centers = data.data.centers;
    response += `<table>
    <tr>
        <th>Center Name</th>
        <th>Availability</th>
    </tr>`;

    for (i in centers) {
      const center = centers[i];
      response += `<tr><td><b>${center.name}</b></td>`;
      for (j in center.sessions) {
        const session = center.sessions[j];
        response += `<td><b>${session.date}</b> <ul> <li>available Capacity : ${session.available_capacity}</li> <li>Min Age Limit: ${session.min_age_limit}</li></ul></td>`;

        if (session.min_age_limit == 18 && session.available_capacity > 0)
          availableDose += session.available_capacity;

        response += `</td></tr>`;
      }
    }

    // availableDose += 7;

    if (availableDose > 0) {
      sendMessage(response);
      sendTextMessage(
        RECEIVERS,
        `${availableDose} doses of vaccine available. Confirm your seat quickly!\n By Piyush [${new Date().toLocaleString()}]`
      );
    }
    console.log(new Date().toLocaleString(), " -> ", availableDose);
    // console.log(response);
  } catch (e) {
    console.log(new Date().toLocaleString(), " -> ", e.message);
  }
}

function test() {
  getVaccineAvailability();
}

function production() {
  getVaccineAvailability();
  setInterval(() => {
    getVaccineAvailability();
  }, 1000 * 150);
}

// test();
production();
