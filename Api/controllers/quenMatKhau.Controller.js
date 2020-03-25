const jwt = require('jsonwebtoken');
const {DbUrl, DbName} = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const {apiLink} = require('../config/constant');
module.exports = {
    GuiEmailKhiQuenMatKhau: function (req, res, next) {
        try {
            const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
            client.connect(function (err, client) {
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const col = db.collection('NguoiDung');
                col.find({email: req.body.email}).next(function (err, doc) {
                    if (err) {
                        res.status(500).json({
                            status: 'fail',
                            message: 'Lỗi ' + err
                        });
                    } else {
                        if (doc == null || doc == undefined) {
                            res.status(200).json({
                                status: 'fail',
                                message: 'User này không có trong hệ thống !'
                            });
                        } else {
                            var SecretKey = process.env.SECRET_KEY;
                            var payload = {
                                userId: doc._id
                            };
                            var token = jwt.sign({payload}, SecretKey, {expiresIn: 60 * 1}); //Hết hạn trong 1 giờ
                            col.updateOne({_id: doc._id}, {
                                $set: {
                                    forgotPassToken: token
                                }
                            }, function (err, r) {
                                client.close( () => {
                                    guiMail(req.body.email, token).then(() => {
                                        res.status(200).json({
                                            status: 'ok',
                                            message: 'Link đổi mật khẩu đã được gửi. Vui lòng kiểm tra email !'
                                        });
                                    })
                                        .catch((e) => {
                                            console.log(e);
                                        })
                                });
                            });
                        }
                    }
                });
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },
    HienThiTrangDoiMatKhau: function (req, res, next) {
        try {
            var token = req.params.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                if (payload) {
                    const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
                    client.connect(function (err, client) {
                        console.log("Connected correctly to server");
                        const db = client.db(DbName);
                        const col = db.collection('NguoiDung');
                        col.find({forgotPassToken: token}).next(function (err, doc) {
                            if (err) {
                                res.status(500).json({
                                    status: 'fail',
                                    message: 'Lỗi ' + err
                                });
                            } else {
                                if (doc == null || doc == undefined) {
                                    res.render('../views/error.ejs');
                                } else {
                                    res.render('../views/resetMatKhau.ejs',{token:token,domain:apiLink});
                                }
                            }
                        });
                    });
                } else {
                    res.render('../views/error.ejs');
                }
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }

    },
    ResetMatKhau: function (req, res, next) {
        try {
            console.log(req.body.password);
            var token = req.body.token;
                bcrypt.genSalt(5, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        const client = new MongoClient(DbUrl, {
                            useNewUrlParser: true,
                            useUnifiedTopology: true
                        });
                        client.connect(function (err, client) {
                            const db = client.db(DbName);
                            const col = db.collection('NguoiDung');
                        //Đổi mật khẩu
                        col.updateOne({forgotPassToken: token}, {
                            $set: {
                                password: hash,
                                forgotPassToken:''
                            }
                        }, function (err, r) {
                            client.close(() => {
                                if (err) {
                                    res.status(500).json({
                                        status: 'fail',
                                        message: err.toString()
                                    });
                                } else {
                                    if (r.result.ok != 1) {
                                        res.status(400).json({
                                            status: 'fail',
                                            message: 'Bạn không có quyền tương tác với tài khoản này !',
                                            r: r
                                        });
                                    } else {
                                        res.status(200).json({
                                            status: 'ok',
                                            message: 'Khôi phục mật khẩu thành công !',
                                            r: r
                                        });
                                    }
                                }
                            });
                        });
                    });
                });
            });
        } catch (err) {
            res.status(500).json({
                status: 'fail',
                message: 'Lỗi '+err
            });
        }

    }

}

async function guiMail(email, token) {
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
    let link = apiLink + 'resetpassword/' + token;
//    let link = apiLink+'resetpassword/:token'
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Wavesoft FM"<foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Link đổi mật khẩu", // Subject line
        text: "Chang pass ?", // plain text body
        html: "<b>Xin vui lòng truy cập vào link sau để đổi mật khẩu, link trên sẽ hết hạn trong 10 phút, xin cảm ơn: <a href=" + link + " style='color: blue'><u>" + link + "</a> </u></b>" // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}