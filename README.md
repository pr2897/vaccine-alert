HOW TO USE THIS APP

STEP 1: SETUP TWILIO ACCOUNT and get the following credentials
1.1 TWILIO_ACCOUNT_SID
1.2 TWILIO_AUTH_TOKEN
1.3 TWILIO_MOBILE_NUMBER

STEP2: create a .env file and set the following environmental variables in the .env file
2.1 TWILIO_ACCOUNT_SID=
2.2 TWILIO_AUTH_TOKEN=
2.3 TWILIO_MOBILE_NUMBER=

STEP 3: update mobile number in receivers array (for sms notifications) -> server.js Line 5

STEP 4: update pin code -> server.js Line 18

step 5: update email address and passowrd for email notification -> send_message.js Line 6,7,14,15
