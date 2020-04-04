const jwt = require('jsonwebtoken');
const { DbUrl, DbName, soItemMoiPage } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const ids = require('short-id');
const assert = require('assert');

module.exports = {
    /*Hàm chức năng của nhân viên--------------------------------*/

    User_LayTatCaHopDong: function (req, res, next) {
        try {
            const page = req.params.page;
            var token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const userId = ObjectId(payload.payload.userId);
                const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('HopDong');
                    console.log(userId);

                    col.find({ idNguoiDung: userId }).limit(soItemMoiPage).skip(soItemMoiPage * page).toArray(function (err, docs) {
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
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }

    },

    User_ThemHopDong: function (req, res, next) {
        try {
            let token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                let userId = payload.payload.managerId;
                let managersId = payload.payload.userId;
                const client = new MongoClient(DbUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('HopDong');
                    let hopdong = {
                        maHopDong: 'HD' + ids.generate().toUpperCase(),
                        tenKhachHang: req.body.tenKhachHang,
                        diaChi: req.body.diaChi,
                        thongTinCMT: {
                            idCMT: req.body.idCMT,
                            noiCap: req.body.noiCap
                        },
                        ngaySinh: {
                            ngay: parseInt(req.body.ngay),
                            thang: parseInt(req.body.thang),
                            nam: parseInt(req.body.nam)
                        },
                        sdt: req.body.sdt,
                        thongTinThem: {
                            ngheNghiep: req.body.ngheNghiep,
                            noiLamViec: req.body.noiLamViec,
                            thuNhap: req.body.thuNhap,
                            nguoiLienHe: req.body.nguoiLienHe,
                            sdtNLH: req.body.sdtNLH,
                            email: req.body.email,
                            hoKhau: req.body.hoKhau,
                            ghiChu: req.body.ghiChu
                        },
                        thongTinHopDong: {
                            ngayVay: {
                                ngay: parseInt(req.body.ngayTHD),
                                thang: parseInt(req.body.thangTHD),
                                nam: parseInt(req.body.namTHD),
                            },
                            tongTienVay: req.body.tongTienVay,
                            soKyDongLai: req.body.soKyDongLai,
                            cachTinhLai: req.body.cachTinhLai,
                            loaiLaiSuat: req.body.loaiLaiSuat,
                            giaTriLaiSuat: req.body.giaTriLaiSuat,
                            soLanTra: req.body.soLanTra,
                            kieuDongLai: req.body.kieuDongLai,
                            tinChap: req.body.tinChap,
                            ghiChu: req.body.ghiChu
                        },
                        trangThaiHopDong: 0,
                        trangThaiXoa: false,
                        idNguoiDung: ObjectId(userId),
                        idManager: ObjectId(managersId)
                    }
                    // Thêm user
                    col.insertOne(hopdong, function (err, r) {
                        client.close(() => {
                            if (err) {
                                res.status(500).json({
                                    status: 'fail',
                                    message: 'Lỗi ' + err
                                });
                            } else {
                                res.status(200).json({
                                    status: 'ok',
                                    message: 'Thêm hợp đồng thành công !'
                                });
                            }
                        });
                    });

                });
            });

        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Thêm thất bại !',
                err: '' + err
            });
        }
    },

    /*Hàm chức năng của manager--------------------------------*/

    Manager_LayTatCaHopDong: function (req, res, next) {
        try {
            const page = req.params.page;
            var token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const managerId = ObjectId(payload.payload.userId);
                const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('HopDong');
                    console.log(managerId);

                    col.find({ idManager: managerId, trangThaiXoa: false }).sort({ _id: -1 }).limit(soItemMoiPage).skip(soItemMoiPage * page).toArray(function (err, docs) {
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
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }

    },

    Manager_ThemHopDong: function (req, res, next) {
        let statuss = req.body.thongTinHopDong.cachTinhLai == 0 ? 1 : 0;
        try {
            let token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, async function (err, payload) {
                const managerId = ObjectId(payload.payload.userId);
                const client = new MongoClient(DbUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                await client.connect();
                const db = client.db(DbName);
                let r = await db.collection("HopDong").insertOne({
                    maHopDong: 'HD' + ids.generate().toUpperCase(),
                    tenKhachHang: req.body.tenKhachHang,
                    sdt: req.body.sdt,
                    email: req.body.email,
                    diaChi: req.body.diaChi,
                    thongTinCMT: req.body.thongTinCMT,
                    ngaySinh: new Date(req.body.ngaySinh),
                    hinhAnh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png',
                    thongTinHopDong: {
                        ...req.body.thongTinHopDong,
                        ngayVay: new Date(req.body.thongTinHopDong.ngayVay),
                        ngayTraGoc: new Date(req.body.thongTinHopDong.ngayTraGoc)
                    },
                    trangThaiHopDong: statuss,
                    trangThaiXoa: false,
                    idNguoiTaoHopDong: managerId,
                    idManager: managerId,
                });
                assert.equal(1, r.insertedCount);
                client.close(() => {
                    if (err) {
                        res.status(500).json({
                            status: 'fail',
                            message: 'Lỗi ' + err
                        });
                    } else {
                        res.status(200).json({
                            status: 'ok',
                            message: 'Thêm chi tiết hợp đồng thành công !'
                        });
                    }
                });
            });

        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Thêm thất bại !',
                err: '' + err
            });
        }
    },

    Manager_XoaMotHopDong: function (req, res, next) {
        try {
            let token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const client = new MongoClient(DbUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('HopDong');
                    let hopdong = {
                        maHopDong: ObjectId(req.body.id)
                    }

                    //Cập nhật trạng thái xóa
                    col.updateOne({ _id: hopdong.maHopDong }, {
                        $set: {
                            trangThaiXoa: true
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
                                    message: 'Xóa thành công !'
                                });
                            }
                        });

                    });

                });

            });

        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: 'Xóa thất bại !',
                err: '' + err
            });
        }
    },

    Manager_TatToanHopDong: async function (req, res) {
        let hopdong = {
            idd: ObjectId(req.body.id)
        }
        try {
            let token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, async function (err, payload) {
                const client = new MongoClient(DbUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });

                await client.connect();
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const col = db.collection('HopDong');
                //Cập nhật trạng thái hợp đồng là 3 (hoàn thành)
                hopdong = await col.updateOne({ _id: hopdong.idd }, { $set: { trangThaiHopDong: 3 } });
                assert.equal(1, hopdong.matchedCount);
                assert.equal(1, hopdong.modifiedCount);
                client.close(() => {
                    if (err) {
                        res.status(500).json({
                            status: 'fail',
                            message: 'Lỗi ' + err
                        });
                    } else {
                        res.status(200).json({
                            status: 'ok',
                            message: 'Tất toán thành công !'
                        });
                    }
                });
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: 'Tất toán thất bại !',
                err: '' + err
            });
        }
    },

    Manager_DongLaiHopDong: async function (req, res) {
        let hopdong = {
            idd: ObjectId(req.body.id),
            statusNoLai: req.body.statusNoLai
        }
        try {
            let token = req.query.token;

            jwt.verify(token, process.env.SECRET_KEY, async function (err, payload) {
                const client = new MongoClient(DbUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });

                await client.connect();
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const col = db.collection('HopDong');
                //Cập nhật trạng thái hợp đồng là 0 hoặc 1  (đủ lãi hoặc nợ lãi)
                hopdong = await col.updateOne({ _id: hopdong.idd }, {
                    $set: { trangThaiHopDong: hopdong.statusNoLai }
                });
                assert.equal(1, hopdong.matchedCount);
                assert.equal(1, hopdong.modifiedCount);
                client.close(() => {
                    if (err) {
                        res.status(500).json({
                            status: 'fail',
                            message: 'Lỗi ' + err
                        });
                    } else {
                        res.status(200).json({
                            status: 'ok',
                            message: 'Đóng lãi thành công !'
                        });
                    }
                });
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: 'Đóng lãi thất bại !',
                err: '' + err
            });
        }
    },

    Manager_GiaHanHopDong: async function (req, res) {
        let hopdong = {
            idd: ObjectId(req.body.id),
            ngayDuocCapNhat: req.body.ngayCapNhat
        }
        try {
            let token = req.query.token;

            jwt.verify(token, process.env.SECRET_KEY, async function (err, payload) {
                const client = new MongoClient(DbUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });

                await client.connect();
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const col = db.collection('HopDong');
                //Cập nhật ngày trả gốc
                hopdong = await col.updateOne({ _id: hopdong.idd }, 
                    {
                    $set: {"thongTinHopDong.ngayTraGoc":new Date(hopdong.ngayDuocCapNhat) }
                });
                assert.equal(1, hopdong.matchedCount);
                assert.equal(1, hopdong.modifiedCount);
                client.close(() => {
                    if (err) {
                        res.status(500).json({
                            status: 'fail',
                            message: 'Lỗi ' + err
                        });
                    } else {
                        res.status(200).json({
                            status: 'ok',
                            message: 'Đóng lãi thành công !'
                        });
                    }
                });
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: 'Đóng lãi thất bại !',
                err: '' + err
            });
        }
    },

    Manager_TraBotGocHopDong: async function (req, res) {
        let hopdong = {
            idd: ObjectId(req.body.id),
            tongTienVay: req.body.tongTienVay
        }
        try {
            let token = req.query.token;

            jwt.verify(token, process.env.SECRET_KEY, async function (err, payload) {
                const client = new MongoClient(DbUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });

                await client.connect();
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const col = db.collection('HopDong');
                //Cập nhật tổng tiền vay
                hopdong = await col.updateOne({ _id: hopdong.idd }, 
                    {
                    $set: {"thongTinHopDong.tongTienVay":parseInt(hopdong.tongTienVay) }
                });
                assert.equal(1, hopdong.matchedCount);
                assert.equal(1, hopdong.modifiedCount);
                client.close(() => {
                    if (err) {
                        res.status(500).json({
                            status: 'fail',
                            message: 'Lỗi ' + err
                        });
                    } else {
                        res.status(200).json({
                            status: 'ok',
                            message: 'Đóng lãi thành công !'
                        });
                    }
                });
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: 'Đóng lãi thất bại !',
                err: '' + err
            });
        }
    },

    Manager_VayThemHopDong: async function (req, res) {
        let hopdong = {
            idd: ObjectId(req.body.id),
            tongTienVay: req.body.tongTienVay
        }
        try {
            let token = req.query.token;

            jwt.verify(token, process.env.SECRET_KEY, async function (err, payload) {
                const client = new MongoClient(DbUrl, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });

                await client.connect();
                console.log("Connected correctly to server");
                const db = client.db(DbName);
                const col = db.collection('HopDong');
                //Cập nhật tổng tiền vay
                hopdong = await col.updateOne({ _id: hopdong.idd }, 
                    {
                    $set: {"thongTinHopDong.tongTienVay":parseInt(hopdong.tongTienVay) }
                });
                assert.equal(1, hopdong.matchedCount);
                assert.equal(1, hopdong.modifiedCount);
                client.close(() => {
                    if (err) {
                        res.status(500).json({
                            status: 'fail',
                            message: 'Lỗi ' + err
                        });
                    } else {
                        res.status(200).json({
                            status: 'ok',
                            message: 'Đóng lãi thành công !'
                        });
                    }
                });
            });
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: 'Đóng lãi thất bại !',
                err: '' + err
            });
        }
    },


    Manager_LayHopDongTheoId: function (req, res, next) {
        let token = req.query.token;
        let hopdongId = req.query.id;
        try {
            //Mở token ra kiểm tra id quản lý
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('HopDong');
                    //tìm trong database theo id hợp đồng
                    col.find({
                        _id: ObjectId(hopdongId)
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
    }
};
