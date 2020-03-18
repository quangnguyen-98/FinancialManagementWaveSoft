const jwt = require('jsonwebtoken');
const paramsObj = require('../config/staticVariable.Config');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const idGenerate = require('../utils/taoMaHopDong');
const ids = require('short-id');

module.exports = {
    /*Hàm chức năng của nhân viên--------------------------------*/
    User_LayTatCaHopDong: function (req, res, next) {
        try {
            const page = req.params.page;
            var token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const userId = ObjectId(payload.payload.userId);
                const client = new MongoClient(paramsObj.url, { useNewUrlParser: true, useUnifiedTopology: true });
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(paramsObj.name);
                    const col = db.collection('HopDong');
                    console.log(userId);

                    col.find({ idNguoiDung: userId }).limit(paramsObj.soItemMoiPage).skip(paramsObj.soItemMoiPage * page).toArray(function (err, docs) {
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
                const client = new MongoClient(paramsObj.url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(paramsObj.name);
                    const col = db.collection('HopDong');
                    console.log(idGenerate.TaoIdHopDong);
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
                            giaTriLaiXuat: req.body.giaTriLaiXuat,
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
                    // Thêm hợp đồng
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
                const client = new MongoClient(paramsObj.url, { useNewUrlParser: true, useUnifiedTopology: true });
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(paramsObj.name);
                    const col = db.collection('HopDong');
                    console.log(managerId);

                    col.find({ idManager: managerId }).limit(paramsObj.soItemMoiPage).skip(paramsObj.soItemMoiPage * page).toArray(function (err, docs) {
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
    //Hàm thêm hợp đồng bởi chủ cho vay (khách hàng mới)
    Manager_ThemHopDong:function(req,res,next){
        try {
            let token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                let userId = payload.payload.managerId;
                let managersId = payload.payload.userId;
                const client = new MongoClient(paramsObj.url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(paramsObj.name);
                    const col = db.collection('HopDong');
                    console.log(idGenerate.TaoIdHopDong);
                    let hopdong = {
                        maHopDong: 'HD'+ids.generate().toUpperCase(),
                        tenKhachHang: req.body.tenKhachHang,
                        diaChi: req.body.diaChi,
                        thongTinCMT:{
                            idCMT:req.body.idCMT,
                            noiCap:req.body.noiCap
                        },
                        ngaySinh: {
                            ngay: parseInt(req.body.ngay),
                            thang: parseInt(req.body.thang),
                            nam: parseInt(req.body.nam)
                        },
                        sdt: req.body.sdt,
                        thongTinThem: {
                            ngheNghiep:'',
                            noiLamViec:'',
                            thuNhap:'',
                            nguoiLienHe:'',
                            sdtNLH:'',
                            email:'',
                            hoKhau:'',
                            ghiChu:''
                        },
                        thongTinHopDong:{
                            ngayVay:{
                                ngay: parseInt(req.body.ngayTHD),
                                thang: parseInt(req.body.thangTHD),
                                nam: parseInt(req.body.namTHD),
                            },
                            tongTienVay:req.body.tongTienVay,
                            soKyDongLai:req.body.soKyDongLai,
                            cachTinhLai:'',
                            loaiLaiSuat:'',
                            giaTriLaiXuat:'',
                            soLanTra:req.body.soLanTra,
                            kieuDongLai:'',
                            tinChap:req.body.tinChap,
                            ghiChu:''
                        },
                        trangThaiHopDong: 0,
                        trangThaiXoa: false,
                        idNguoiDung: '',
                        idManager: ''
                    }
                    // Thêm hợp đồng
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
    }
};
