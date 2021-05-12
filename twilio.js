require("dotenv").config();

// Twilio Credentials
// To set up environmental variables, see http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// require the Twilio module and create a REST client
const client = require("twilio")(accountSid, authToken);

module.exports = function sendTextMessage(receivers, text) {
  receivers.forEach((receiver) => {
    client.messages
      .create({
        to: receiver,
        from: process.env.TWILIO_MOBILE_NUMBER,
        body: text,
      })
      .then((message) => console.log(message.sid))
      .catch((err) => console.log(err));
  });
};
