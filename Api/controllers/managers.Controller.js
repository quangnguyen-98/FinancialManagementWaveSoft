const jwt = require('jsonwebtoken');
const {DbUrl,DbName,soItemMoiPage} = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const hamHoTro = require('../utils/hamHoTro');
module.exports = {
    //Thao tác CRUD quản lý của admin
    LayTatCaManager: function (req, res, next) {
        const page = req.params.page;
        try {
            const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
            client.connect(function (err, client) {
                const db = client.db(DbName);
                const col = db.collection('NguoiDung');
                col.find({
                    vaiTro: 1
                }).sort({_id:-1}).limit(soItemMoiPage).skip(soItemMoiPage * page).toArray(function (err, docs) {
                    client.close(() => {
                        if (err) {

                            res.status(500).json({
                                status: 'fail',
                                message: 'Lỗi ' + err
                            });
                        } else {
                            console.log("Tìm thành công !");
                            res.status(200).json(docs);
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

    LayManagerTheoId: function (req, res, next) {
        const id = ObjectId(req.query.id);
        try {
            const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
            client.connect(function (err, client) {
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const col = db.collection('NguoiDung');

                col.find({
                    vaiTro: 1,
                    _id:id
                }).toArray(function (err, docs) {
                    client.close(() => {
                        if (err) {
                            res.status(500).json({
                                status: 'fail',
                                message: 'Lỗi ' + err
                            });
                        } else {
                            res.status(200).json(docs);
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

    TimKiemManager: function (req, res, next) {
        const ten = hamHoTro.BoDau(req.query.ten.toLowerCase());
        try {
            const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
            client.connect(function (err, client) {
                const db = client.db(DbName);
                const col = db.collection('NguoiDung');
                col.find({
                    '$or':[
                        {
                            vaiTro: 1,
                            lowerCase:{'$regex': ten,'$options':'$i'}
                        },
                        {
                            vaiTro: 1,
                            email:{'$regex': ten,'$options':'$i'}
                        },
                        {
                            vaiTro: 1,
                            sdt:{'$regex': ten,'$options':'$i'}
                        }
                    ]
                }).sort({_id:-1}).limit(15).toArray(function (err, docs) {
                    client.close(() => {
                        if (err) {
                            res.status(500).json({
                                status: 'fail',
                                message: 'Lỗi ' + err
                            });
                        } else {
                            res.status(200).json(docs);
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

    ThemManager: function (req, res, next) {
        try {
            //Mã hóa mật khẩu trước khi add vào db
            bcrypt.genSalt(5, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
                    //Kết nối db
                    client.connect(function (err, client) {
                        console.log("Connected correctly to server");
                        const db = client.db(DbName);
                        const col = db.collection('NguoiDung');
                        //Tạo parameter user
                        let user = {
                            email: req.body.email.toLowerCase(),
                            password: hash,
                            hoTen: req.body.hoTen,
                            lowerCase: hamHoTro.BoDau(req.body.hoTen.toLowerCase()),
                            gioiTinh: req.body.gioiTinh,
                            ngaySinh: new Date(req.body.ngaySinh),
                            diaChi: req.body.diaChi,
                            sdt: req.body.sdt,
                            hinhAnh: req.body.hinhAnh,
                            vaiTro: 1,
                            quyenHan: 1,
                            forgotPassToken: '',
                            trangThaiKhoa:false
                        }
                        // Thêm user vào db
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
                                        message: 'Thêm thành công !'
                                    });
                                }
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

    CapNhatManager: function (req, res, next) {
        try {
            const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
            client.connect(function (err, client) {
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const col = db.collection('NguoiDung');
                // var boolValue = req.query.gioiTinh.toLowerCase() == 'true' ? true : false;
                let user = {
                    id: ObjectId(req.body.id),
                    // email: req.body.email,
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
                console.log(typeof user.hinhAnh);
                // Cập nhật manager
                col.updateOne({_id: user.id}, {
                    $set: {
                        hoTen: user.hoTen,
                        gioiTinh: user.gioiTinh,
                        ngaySinh:user.ngaySinh,
                        diaChi: user.diaChi,
                        sdt: user.sdt,
                        hinhAnh: user.hinhAnh
                    }
                }, function (err, r) {
                    client.close(() => {
                        if (err) {
                            res.status(500).json({
                                status: 'fail',
                                message: 'Lỗi ' + err
                            });
                        } else {
                            res.status(200).json({
                                status: 'ok',
                                message: 'Cập nhật thành công !'
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

    KhoaManager: function (req, res, next) {
        try {
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
                col.updateOne({_id: user.id}, {
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
                            res.status(200).json({
                                status: 'ok',
                                message: 'Khóa tài khoản thành công !'
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

    MoKhoaManager: function (req, res, next) {
        try {
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
                col.updateOne({_id: user.id}, {
                    $set: {
                        trangThaiKhoa: false,
                    }
                }, function (err, r) {
                    client.close(() => {
                        if (err) {
                            res.status(500).json({
                                status: 'fail',
                                message: err.toString()
                            });
                        } else {
                            res.status(200).json({
                                status: 'ok',
                                message: 'Khóa tài khoản thành công !'
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

    XoaManager: function (req, res, next) {
        try {
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
                    }
                    else if(docs.length != 0){
                        res.status(400).json({
                            status: 'fail',
                            message: 'Không thể xóa do người dùng đã tạo hợp đồng !'
                        });
                    }else if(docs.length == 0){
                        // Xóa manager
                        col.deleteOne({_id: user.id}, function(err, r) {
                            client.close(() => {
                                if (err) {
                                    res.status(500).json({
                                        status: 'fail',
                                        message: 'Lỗi ' + err
                                    });
                                } else {
                                    res.status(200).json({
                                        status: 'ok',
                                        message: 'Xóa thành công !'
                                    });
                                }
                            });
                        });
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

    CapNhatManager: function (req, res, next) {
        try {
            const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
            client.connect(function (err, client) {
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const col = db.collection('NguoiDung');
                // var boolValue = req.query.gioiTinh.toLowerCase() == 'true' ? true : false;
                let user = {
                    id: ObjectId(req.body.id),
                    // email: req.body.email,
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
                console.log(typeof user.hinhAnh);
                // Cập nhật manager
                col.updateOne({_id: user.id}, {
                    $set: {
                        hoTen: user.hoTen,
                        gioiTinh: user.gioiTinh,
                        ngaySinh:user.ngaySinh,
                        diaChi: user.diaChi,
                        sdt: user.sdt,
                        hinhAnh: user.hinhAnh
                    }
                }, function (err, r) {
                    client.close(() => {
                        if (err) {
                            res.status(500).json({
                                status: 'fail',
                                message: 'Lỗi ' + err
                            });
                        } else {
                            res.status(200).json({
                                status: 'ok',
                                message: 'Cập nhật thành công !'
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
    }
}