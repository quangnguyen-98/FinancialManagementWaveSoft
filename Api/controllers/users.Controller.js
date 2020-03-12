const jwt = require('jsonwebtoken');
const paramsObj = require('../config/staticVariable.Config');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;
module.exports = {
    LayTatCaUser: function (req, res, next) {
        const page = req.params.page;
        let token = req.query.token;
        let managerId;
        try {
            //Mở token ra kiểm tra id quản lý
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                managerId = payload.payload.userId;
                const client = new MongoClient(paramsObj.url, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(paramsObj.name);
                    const col = db.collection('NguoiDung');
                    //Query những nhân viên thuộc quyền quản lý của chủ nhân viên
                    col.find({vaiTro: 2,idManager: ObjectId(managerId)}).limit(paramsObj.soItemMoiPage).skip(paramsObj.soItemMoiPage * page).toArray(function (err, docs) {
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
                message: 'Token không hợp lệ 123'
            });
            return;
        }
    },

    KiemTraUserTonTai_KhiThem: function (req, res, next) {
        try {
            const client = new MongoClient(paramsObj.url, {useNewUrlParser: true, useUnifiedTopology: true});
            client.connect(function (err, client) {
                console.log("Connected correctly to server");
                const db = client.db(paramsObj.name);
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
            const client = new MongoClient(paramsObj.url, {useNewUrlParser: true, useUnifiedTopology: true});
            client.connect(function (err, client) {
                console.log("Connected correctly to server");
                const db = client.db(paramsObj.name);
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
                message: 'Token không hợp lệ'
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
                        const client = new MongoClient(paramsObj.url, {
                            useNewUrlParser: true,
                            useUnifiedTopology: true
                        });
                        client.connect(function (err, client) {
                            console.log("Connected correctly to server");
                            const db = client.db(paramsObj.name);
                            const col = db.collection('NguoiDung');
                            let user = {
                                email: req.body.email,
                                password: hash,
                                hoTen: req.body.hoTen,
                                gioiTinh: req.body.gioiTinh,
                                ngaySinh: {
                                    ngay: parseInt(req.body.ngay),
                                    thang: parseInt(req.body.thang),
                                    nam: parseInt(req.body.nam)
                                },
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
                const client = new MongoClient(paramsObj.url, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(paramsObj.name);
                    const col = db.collection('NguoiDung');
                    let user = {
                        id: ObjectId(req.body.id),
                        email: req.body.email,
                        password: req.body.password == undefined || req.body.password == null ?'':req.body.password,
                        hoTen: req.body.hoTen,
                        gioiTinh: req.body.gioiTinh.toLowerCase() == 'true' ? true : false,
                        ngaySinh: {
                            ngay: parseInt(req.body.ngay),
                            thang: parseInt(req.body.thang),
                            nam: parseInt(req.body.nam)
                        },
                        diaChi: req.body.diaChi,
                        sdt: req.body.sdt,
                        hinhAnh: req.body.hinhAnh == undefined || req.body.hinhAnh == null ? null:req.body.hinhAnh,

                    }
                    // Cập nhật user
                    col.updateOne({_id: user.id,idManager:managerId}, {
                        $set: {
                            hoTen: user.hoTen,
                            gioiTinh: user.gioiTinh,
                            ngaySinh:user.ngaySinh,
                            diaChi: user.diaChi,
                            sdt: user.sdt,
                            hinhAnh: user.hinhAnh,
                        }
                    }, function (err, r) {
                        client.close(() => {
                            if (err) {
                                res.status(500).json({
                                    status: 'fail',
                                    message:err.toString()
                                });
                            } else {
                                if(r.result.nModified == 0){
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Bạn không có quyền tương tác với tài khoản này !',
                                        r:r
                                    });
                                }else {
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Cập nhật thành công !',
                                        r:r
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
                const client = new MongoClient(paramsObj.url, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(paramsObj.name);
                    const col = db.collection('NguoiDung');
                    // var boolValue = req.query.gioiTinh.toLowerCase() == 'true' ? true : false;
                    let user = {
                        id: ObjectId(req.body.id),
                    }
                    // Cập nhật manager
                    col.updateOne({_id: user.id,idManager:managerId}, {
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
                                if(r.result.nModified == 0){
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Bạn không có quyền tương tác với tài khoản này !'
                                    });
                                }else {
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
                const client = new MongoClient(paramsObj.url, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(paramsObj.name);
                    const col = db.collection('NguoiDung');
                    // var boolValue = req.query.gioiTinh.toLowerCase() == 'true' ? true : false;
                    let user = {
                        id: ObjectId(req.body.id),
                    }
                    // Cập nhật manager
                    col.updateOne({_id: user.id,idManager:managerId}, {
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
                                if(r.result.nModified == 0){
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Bạn không có quyền tương tác với tài khoản này !'
                                    });
                                }else {
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
                const client = new MongoClient(paramsObj.url, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(paramsObj.name);
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
                        }
                        else if(docs.length != 0){
                            res.status(400).json({
                                status: 'fail',
                                message: 'Không thể xóa do người dùng đã tạo hợp đồng !'
                            });
                        }else if(docs.length == 0){
                            // Xóa manager
                            col.deleteOne({_id: user.id,idManager:managerId}, function(err, r) {
                                client.close(() => {
                                    if (err) {
                                        res.status(500).json({
                                            status: 'fail',
                                            message: 'Lỗi ' + err
                                        });
                                    } else {
                                        if(r.result.nModified == 0){
                                            res.status(200).json({
                                                status: 'ok',
                                                message: 'Bạn không có quyền tương tác với tài khoản này !'
                                            });
                                        }else {
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

    CapNhatBanThanUser: function (req, res, next) {
        try {
            var token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const userId = ObjectId(payload.payload.userId);
                const client = new MongoClient(paramsObj.url, {useNewUrlParser: true, useUnifiedTopology: true});
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(paramsObj.name);
                    const col = db.collection('NguoiDung');
                    let user = {
                        email: req.body.email,
                        password: req.body.password == undefined || req.body.password == null ?'':req.body.password,
                        hoTen: req.body.hoTen,
                        gioiTinh: req.body.gioiTinh.toLowerCase() == 'true' ? true : false,
                        ngaySinh: {
                            ngay: parseInt(req.body.ngay),
                            thang: parseInt(req.body.thang),
                            nam: parseInt(req.body.nam)
                        },
                        diaChi: req.body.diaChi,
                        sdt: req.body.sdt,
                        hinhAnh: req.body.hinhAnh == undefined || req.body.hinhAnh == null ? null:req.body.hinhAnh,

                    }
                    // Cập nhật admin
                    col.updateOne({_id: userId}, {
                        $set: {
                            hoTen: user.hoTen,
                            gioiTinh: user.gioiTinh,
                            ngaySinh:user.ngaySinh,
                            diaChi: user.diaChi,
                            sdt: user.sdt,
                            hinhAnh: user.hinhAnh,
                        }
                    }, function (err, r) {
                        client.close(() => {
                            if (err) {
                                res.status(500).json({
                                    status: 'fail',
                                    message:err.toString()
                                });
                            } else {
                                if(r.result.nModified == 0){
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Bạn không có quyền tương tác với tài khoản này !',
                                        r:r
                                    });
                                }else {
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Cập nhật thành công !',
                                        r:r
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

    DoiMatKhau: function (req, res, next) {
        try {
            var token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const userId = ObjectId(payload.payload.userId);
                bcrypt.genSalt(5, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        const client = new MongoClient(paramsObj.url, {useNewUrlParser: true, useUnifiedTopology: true});
                        client.connect(function (err, client) {
                            console.log("Connected correctly to server");
                            const db = client.db(paramsObj.name);
                            const col = db.collection('NguoiDung');

                            //Đổi mật khẩu
                            col.updateOne({_id: userId}, {
                                $set: {
                                    password: hash
                                }
                            }, function (err, r) {
                                client.close(() => {
                                    if (err) {
                                        res.status(500).json({
                                            status: 'fail',
                                            message:err.toString()
                                        });
                                    } else {
                                        if(r.result.nModified == 0){
                                            res.status(200).json({
                                                status: 'ok',
                                                message: 'Bạn không có quyền tương tác với tài khoản này !',
                                                r:r
                                            });
                                        }else {
                                            res.status(200).json({
                                                status: 'ok',
                                                message: 'Cập nhật thành công !',
                                                r:r
                                            });
                                        }
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
                message: 'Token không hợp lệ !'
            });
        }
    },
}