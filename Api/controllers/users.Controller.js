const jwt = require('jsonwebtoken');
const {DbUrl,DbName,soItemMoiPage} = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const ObjectId = require('mongodb').ObjectId;
const hamHoTro = require('../utils/hamHoTro');
module.exports = {
    //Thực hiện bởi admin hoặc chủ cho vay
    KiemTraUserTonTai_KhiThem: function (req, res, next) {
        try {
            const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
            client.connect(function (err, client) {
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const col = db.collection('NguoiDung');

                let email = req.body.email;
                col.find({email: email}).toArray(function (err, docs) {
                    client.close(() => {
                        if (err) {
                            res.status(500).json({
                                status: 'fail',
                                message: 'Lỗi ' + err
                            });
                        } else {
                            if (docs.length > 0) {
                                res.status(200).json({
                                    status: 'fail',
                                    message: 'Email đã tồn tại !'
                                });
                            } else {
                                next();
                            }

                        }
                    });
                });
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ'
            });
        }
    },

    KiemTraUserTonTai_KhiXoa: function (req, res, next) {
        try {
            const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
            client.connect(function (err, client) {
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const col = db.collection('NguoiDung');

                let id = ObjectId(req.body.id);
                col.find({_id: id}).toArray(function (err, docs) {
                    client.close(() => {
                        if (err) {
                            res.status(500).json({
                                status: 'fail',
                                message: 'Lỗi ' + err
                            });
                        } else {
                            if (docs.length == 0) {
                                res.status(200).json({
                                    status: 'fail',
                                    message: 'User này không có trong hệ thống !'
                                });
                            } else {
                                next();
                            }

                        }
                    });
                });
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    LayThongtinUser: function (req, res, next) {
        let token = req.query.token;
        try {
            //Mở token ra kiểm tra id user
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                let userId = payload.payload.userId;
                const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('NguoiDung');
                    //Query những nhân viên thuộc quyền quản lý của chủ nhân viên
                    col.find({_id: ObjectId(userId)}).next(function (err, docs) {
                        client.close(() => {
                            if (err) {
                                res.status(500).json({
                                    status: 'fail',
                                    message: err.toString()
                                });
                            } else {
                                res.status(200).json(docs);
                            }
                        });
                    });
                });
            });

        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    ThemUser: function (req, res, next) {
        try {
            let token = req.query.token;
            let managersId;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                managersId = payload.payload.userId;
                bcrypt.genSalt(5, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        const client = new MongoClient(DbUrl, {
                            useNewUrlParser: true,
                            useUnifiedTopology: true
                        });
                        client.connect(function (err, client) {
                            console.log("Connected correctly to server");
                            const db = client.db(DbName);
                            const col = db.collection('NguoiDung');
                            let user = {
                                email: req.body.email,
                                password: hash,
                                hoTen: req.body.hoTen,
                                lowerCase: hamHoTro.BoDau(req.body.hoTen.toLowerCase()),
                                gioiTinh: req.body.gioiTinh,
                                ngaySinh: new Date(req.body.ngaySinh),
                                diaChi: req.body.diaChi,
                                sdt: req.body.sdt,
                                hinhAnh: req.body.hinhAnh,
                                vaiTro: 2,
                                quyenHan: 2,
                                forgotPassToken: '',
                                trangThaiKhoa: false,
                                idManager: ObjectId(managersId)
                            }
                            // Thêm user
                            col.insertOne(user, function (err, r) {
                                client.close(() => {
                                    if (err) {
                                        res.status(500).json({
                                            status: 'fail',
                                            message: 'Lỗi ' + err
                                        });
                                    } else {
                                        res.status(200).json({
                                            status: 'ok',
                                            message: 'Thêm nhân viên thành công !'
                                        });
                                    }
                                });
                            });

                        });
                    });
                });
            });

        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Thêm thất bại  !',
                err: '' + err
            });
        }
    },

    CapNhatUser: function (req, res, next) {
        try {
            var token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const managerId = ObjectId(payload.payload.userId);
                const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('NguoiDung');
                    let user = {
                        id: ObjectId(req.body.id),
                        email: req.body.email,
                        password: req.body.password == undefined || req.body.password == null ? '' : req.body.password,
                        hoTen: req.body.hoTen,
                        gioiTinh: req.body.gioiTinh.toLowerCase() == 'true' ? true : false,
                        ngaySinh: {
                            ngay: parseInt(req.body.ngay),
                            thang: parseInt(req.body.thang),
                            nam: parseInt(req.body.nam)
                        },
                        diaChi: req.body.diaChi,
                        sdt: req.body.sdt,
                        hinhAnh: req.body.hinhAnh == undefined || req.body.hinhAnh == null ? null : req.body.hinhAnh,

                    }
                    // Cập nhật user
                    col.updateOne({_id: user.id, idManager: managerId}, {
                        $set: {
                            hoTen: user.hoTen,
                            gioiTinh: user.gioiTinh,
                            ngaySinh: user.ngaySinh,
                            diaChi: user.diaChi,
                            sdt: user.sdt,
                            hinhAnh: user.hinhAnh,
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
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Bạn không có quyền tương tác với tài khoản này !',
                                        r: r
                                    });
                                } else {
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Cập nhật thành công !',
                                        r: r
                                    });
                                }
                            }
                        });
                    });
                });
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    KhoaUser: function (req, res, next) {
        try {
            var token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const managerId = ObjectId(payload.payload.userId);
                const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('NguoiDung');
                    // var boolValue = req.query.gioiTinh.toLowerCase() == 'true' ? true : false;
                    let user = {
                        id: ObjectId(req.body.id),
                    }
                    // Cập nhật manager
                    col.updateOne({_id: user.id, idManager: managerId}, {
                        $set: {
                            trangThaiKhoa: true,
                        }
                    }, function (err, r) {
                        client.close(() => {
                            if (err) {
                                res.status(500).json({
                                    status: 'fail',
                                    message: 'Lỗi ' + err
                                });
                            } else {
                                if (r.result.ok != 1) {
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Bạn không có quyền tương tác với tài khoản này !'
                                    });
                                } else {
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Khóa tài khoản thành công !'
                                    });
                                }
                            }
                        });
                    });
                });
            });

        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    MoKhoaUser: function (req, res, next) {
        try {
            var token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const managerId = ObjectId(payload.payload.userId);
                const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('NguoiDung');
                    // var boolValue = req.query.gioiTinh.toLowerCase() == 'true' ? true : false;
                    let user = {
                        id: ObjectId(req.body.id),
                    }
                    // Cập nhật manager
                    col.updateOne({_id: user.id, idManager: managerId}, {
                        $set: {
                            trangThaiKhoa: false,
                        }
                    }, function (err, r) {
                        client.close(() => {
                            if (err) {
                                res.status(500).json({
                                    status: 'fail',
                                    message: 'Lỗi ' + err
                                });
                            } else {
                                if (r.result.ok != 1) {
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Bạn không có quyền tương tác với tài khoản này !'
                                    });
                                } else {
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Khóa tài khoản thành công !'
                                    });
                                }
                            }
                        });
                    });
                });
            });

        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    XoaUser: function (req, res, next) {
        try {
            var token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const managerId = ObjectId(payload.payload.userId);
                const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('NguoiDung');
                    const colHopDong = db.collection('HopDong');
                    // var boolValue = req.query.gioiTinh.toLowerCase() == 'true' ? true : false;
                    let user = {
                        id: ObjectId(req.body.id)
                    }
                    colHopDong.find({idManager: user.id}).limit(1).toArray(function (err, docs) {
                        if (err) {
                            res.status(500).json({
                                status: 'fail',
                                message: 'Lỗi ' + err
                            });
                        } else if (docs.length != 0) {
                            res.status(400).json({
                                status: 'fail',
                                message: 'Không thể xóa do người dùng đã tạo hợp đồng !'
                            });
                        } else if (docs.length == 0) {
                            // Xóa manager
                            col.deleteOne({_id: user.id, idManager: managerId}, function (err, r) {
                                client.close(() => {
                                    if (err) {
                                        res.status(500).json({
                                            status: 'fail',
                                            message: 'Lỗi ' + err
                                        });
                                    } else {
                                        if (r.result.ok != 1) {
                                            res.status(200).json({
                                                status: 'ok',
                                                message: 'Bạn không có quyền tương tác với tài khoản này !'
                                            });
                                        } else {
                                            res.status(200).json({
                                                status: 'ok',
                                                message: 'Xóa thành công !'
                                            });
                                        }
                                    }
                                });
                            });
                        }
                    });
                });
            });

        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    //Thực hiện bởi chủ cho vay
    LayUserTheoTrang: function (req, res, next) {
        const page = req.params.page;
        let token = req.query.token;
        let managerId;
        try {
            //Mở token ra kiểm tra id quản lý
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                //Lấy userId trong token để lọc ra những user thuộc từng quản lý
                managerId = payload.payload.userId;
                const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('NguoiDung');
                    //Query những nhân viên thuộc quyền quản lý của chủ nhân viên
                    col.find({
                        vaiTro: 2,
                        idManager: ObjectId(managerId)
                    }).sort({_id: -1}).limit(soItemMoiPage).skip(soItemMoiPage * page).toArray(function (err, docs) {
                        client.close(() => {
                            if (err) {
                                res.status(500).json({
                                    status: 'fail',
                                    message: err.toString()
                                });
                            } else {
                                res.status(200).json(docs);
                            }
                        });
                    });
                });
            });

        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    LayUserTheoId: function (req, res, next) {
        let token = req.query.token;
        let userId =ObjectId (req.query.id);
        try {
            //Mở token ra kiểm tra id quản lý
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                //Lấy userId trong token để lọc ra những user thuộc từng quản lý
                let managerId = ObjectId(payload.payload.userId);
                const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('NguoiDung');
                    //Query những nhân viên thuộc quyền quản lý của chủ nhân viên
                    col.find({
                        vaiTro: 2,
                        idManager: managerId,
                        _id:userId
                    }).toArray(function (err, docs) {
                        client.close(() => {
                            if (err) {
                                res.status(500).json({
                                    status: 'fail',
                                    message: err.toString()
                                });
                            } else {
                                res.status(200).json(docs);
                            }
                        });
                    });
                });
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    TimKiemUser: function (req, res, next) {
        let token = req.query.token;
        let tuKhoaTimKiem = req.query.ten.toLowerCase();
        try {
            //Mở token ra kiểm tra id quản lý
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                //Lấy userId trong token để lọc ra những user thuộc từng quản lý
                let managerId = ObjectId(payload.payload.userId);
                const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('NguoiDung');
                    //Query những nhân viên thuộc quyền quản lý của chủ nhân viên
                    col.find({
                        '$or':[
                            {
                                vaiTro: 2,
                                idManager:managerId,
                                lowerCase:{'$regex': tuKhoaTimKiem,'$options':'$i'}
                            },
                            {
                                vaiTro: 2,
                                idManager:managerId,
                                email:{'$regex': tuKhoaTimKiem,'$options':'$i'}
                            },
                            {
                                vaiTro: 2,
                                idManager:managerId,
                                sdt:{'$regex': tuKhoaTimKiem,'$options':'$i'}
                            }
                        ]
                    }).sort({_id:-1}).limit(15).toArray(function (err, docs) {
                        client.close(() => {
                            if (err) {
                                res.status(500).json({
                                    status: 'fail',
                                    message: err.toString()
                                });
                            } else {
                                res.status(200).json(docs);
                            }
                        });
                    });
                });
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    //Thực hiện bởi mọi user
    CapNhatBanThanUser: function (req, res, next) {
        try {
            var token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const userId = ObjectId(payload.payload.userId);
                const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('NguoiDung');

                    // Cập nhật admin
                    col.updateOne({_id: userId}, {
                        $set: {
                            hoTen: req.body.hoTen,
                            lowerCase:hamHoTro.BoDau(req.body.hoTen.toLowerCase()),
                            gioiTinh: req.body.gioiTinh,
                            ngaySinh: new Date(req.body.ngaySinh) ,
                            diaChi: req.body.diaChi,
                            sdt: req.body.sdt,
                        }
                    }, function (err, r) {
                        client.close(() => {
                            if (err) {
                                res.status(500).json({
                                    status: 'fail',
                                    message: err.toString()
                                });
                            } else {
                                console.log(r);
                                if (r.result.ok != 1) {
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Bạn không có quyền tương tác với tài khoản này !',
                                        r: r
                                    });
                                } else {
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Cập nhật thành công !',
                                        r: r
                                    });
                                }
                            }
                        });
                    });
                });
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    KiemTraMatKhau: function (req, res, next) {
        try {
            const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
            //Tạo biến user và pass
            let username = req.body.username;
            let password = req.body.passwordCu;
            //Kết nối db
            client.connect(function (err, client) {
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const col = db.collection('NguoiDung');
                //Tìm user
                col.find({email: username}).toArray(function (err, docs) {
                    client.close(() => {
                        if (err) {
                            res.status(500).json({
                                status: 'fail',
                                message: 'Lỗi ' + err
                            });
                        } else {
                            //Kiểm tra mảng user có rỗng không và kiểm tra mật khẩu
                            if (docs.length !== 0) {
                                if (docs[0].trangThaiKhoa == true) {
                                    res.status(400).json({
                                        status: "fail",
                                        message: "Tài khoản đã bị khóa, xin vui lòng liên hệ chủ tài khoản để mở lại !",
                                    });
                                } else {
                                    bcrypt.compare(password, docs[0].password, function (err, result) {
                                        // result == true
                                        if (result) {
                                            next();
                                        } else {
                                            res.status(400).json({
                                                status: "fail",
                                                message: "Mật khẩu cũ không chính xác !",
                                            });
                                        }
                                    });
                                }
                            } else {
                                res.status(400).json({
                                    status: "fail",
                                    message: "Tài khoản hoặc mật khẩu không chính xác !",
                                });
                            }
                        }
                    });
                });
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    DoiMatKhau: async function (req, res, next) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        var token = req.query.token;
        try {
            let tokenResult = await jwt.verify(token, process.env.SECRET_KEY);
            const userId = ObjectId(tokenResult.payload.userId);
            await client.connect();
            const db = client.db(DbName);
            const col = db.collection('NguoiDung');
            //Kiểm tra mật khẩu cũ có đúng không
            let nguoiDung = await col.find({_id: userId}).next();
            console.log(nguoiDung);
            console.log(req.body.passwordcu);
            let kqSoSanh = bcrypt.compareSync(req.body.passwordcu,nguoiDung.password);
            if(!kqSoSanh){
                res.status(400).json({
                    status: "fail",
                    message: 'Mật khẩu cũ không đúng, vui lòng nhập lại !'
                });
                return ;
            }
            let salt = bcrypt.genSaltSync(5);
            let hash = bcrypt.hashSync(req.body.password, salt);


            //Đổi mật khẩu
            let doiPassResult = await col.updateOne({_id: userId}, {
                $set: {
                    password: hash
                }
            });
            client.close();
            if (doiPassResult.result.ok != 1) {
                res.status(400).json({
                    status: 'fail',
                    message: 'Bạn không có quyền tương tác với tài khoản này !'
                });
            } else {
                res.status(200).json({
                    status: 'ok',
                    message: 'Đổi mật khẩu thành công !'
                });
            }
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'+err
            });
        }
    },

    GuiMailKhachHang:async function (req,res,next) {
        try {
            let email = req.body.email;
            let tieuDe = req.body.tieuDe;
            let noiDung = req.body.noiDung;
            console.log(email)
            console.log(tieuDe)
            console.log(noiDung)
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
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Wavesoft FM"<foo@example.com>', // sender address
                to: email, // list of receivers
                subject: tieuDe, // Subject line
                text: "Chang pass ?", // plain text body
                html: "<p>"+noiDung+"</p>" // html body
            });

            res.status(200).json({
                status: 'ok',
                message: 'Gủi mail thành công !',
            });
        }catch (e) {
            console.log(e)
            res.status(400).json({
                status: "fail",
                message: 'Vui lòng nhập đủ thông tin !'
            });
        }

    }
}