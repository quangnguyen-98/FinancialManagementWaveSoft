"use strict";
const nodemailer = require("nodemailer");
const {apiLink} = require('../config/constant');
// async..await is not allowed in global scope, must use a wrapper
async function main(token) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'quangnguyen.tester@gmail.com', // generated ethereal user
            pass: 'quangdeptrai01' // generated ethereal password
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });
    let link = apiLink+'resetpassword/8fy23894y5hu23htuh4235'
//    let link = apiLink+'resetpassword/:token'
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Wavesoft FM"<foo@example.com>', // sender address
        to: "quangnguyen.4298@gmail.com", // list of receivers
        subject: "Link đổi mật khẩu", // Subject line
        text: "Chang pass ?", // plain text body
        html: "<b>Xin vui lòng truy cập vào link sau để đổi mật khẩu, link trên sẽ hết hạn trong 10 phút, xin cảm ơn: <a href="+link+" style='color: blue'><u>"+link+"</a> </u></b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

 main().catch(console.error);
