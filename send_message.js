const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR EMAIL ADDRESS",
    pass: "YOUR PASSWORD",
  },
});

module.exports = function sendMessage(data) {
  transporter.sendMail(
    {
      from: "YOUR EMAIL ADDRESS",
      to: "RECEIVER EMAIL ADDRESS",
      subject: "Covid Vaccine Availability Alert",
      html: data,
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

async function getVaccineAvailability() {
  console.log(`Function Called`);
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

        if (session.min_age_limit == 18 && session.available_capacity > 2)
          availableDose += session.available_capacity;

        response += `</td></tr>`;
      }
    }

    if (availableDose > 0) sendMessage(response);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
