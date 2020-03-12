const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: '8d77f0ef',
    apiSecret: 'N7ZCSK6R5nLxRuTh',
});

const from = 'Nexmo';
const to = '84346065968';
const to1 = '84359219062';
const text = 'Hello from Nexmo';

// nexmo.message.sendSms(from, to, text);
nexmo.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})