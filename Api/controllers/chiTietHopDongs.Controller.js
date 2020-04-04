const jwt = require('jsonwebtoken');
const { DbUrl, DbName, soItemMoiPage } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const ids = require('short-id');
const assert = require('assert');

module.exports = {

    Manager_ThemChiTietHopDong: async function (req, res) {
        let token = req.query.token;
        try {
            //Mở token ra kiểm tra id quản lý
            jwt.verify(token, process.env.SECRET_KEY, async function (err, payload) {
                const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
                await client.connect();
                const db = client.db(DbName);
                let r = await db.collection("ChiTietHopDong").insertOne({
                    loaiChiTiet: parseInt(req.body.loaiChiTiet),
                    thongTinDongLai: {
                        nguoiThanhToan: req.body.thongTinDongLai.nguoiThanhToan,
                        tienDongLai: req.body.thongTinDongLai.tienDongLai,
                        ngayDongLai: new Date(req.body.thongTinDongLai.ngayDongLai),
                        ghiChu: req.body.thongTinDongLai.ghiChu
                    },
                    thongTinTatToan: {
                        nguoiThanhToan: req.body.thongTinTatToan.nguoiThanhToan,
                        tienTatToan: req.body.thongTinTatToan.tienTatToan,
                        ngayTatToan: new Date(req.body.thongTinTatToan.ngayTatToan),
                        ghiChu: req.body.thongTinTatToan.ghiChu
                    },
                    thongTinTraBotGoc: {
                        nguoiThanhToan: req.body.thongTinTraBotGoc.nguoiThanhToan,
                        tienTraBotGoc: req.body.thongTinTraBotGoc.tienTraBotGoc,
                        ngayTraBotGoc: new Date(req.body.thongTinTraBotGoc.ngayTraBotGoc),
                        ghiChu: req.body.thongTinTraBotGoc.ghiChu
                    },
                    thongTinVayThem: {
                        nguoiThanhToan: req.body.thongTinVayThem.nguoiThanhToan,
                        tienVayThem: req.body.thongTinVayThem.tienVayThem,
                        ngayVayThem: new Date(req.body.thongTinVayThem.ngayVayThem),
                        ghiChu: req.body.thongTinVayThem.ghiChu
                    },
                    thongTinGiaHanKy: {
                        soLanGiaHan: req.body.thongTinGiaHanKy.soLanGiaHan,
                        ngayGiaHan: new Date(req.body.thongTinGiaHanKy.ngayGiaHan),
                        liDoGiaHan: req.body.thongTinGiaHanKy.liDoGiaHan

                    },
                    idHopDong: ObjectId(req.body.idHopDong)

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
                message: 'Token không hợp lệ !'
            });
        }
    },
    Manager_LayTatCaChiTietHopDong_TheoIdHopDong: function (req, res, next) {
        try {
            var idHopDong =ObjectId(req.query.id);
            var token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const managerId = ObjectId(payload.payload.userId);
                const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
                client.connect(function (err, client) {
                    console.log("Connected correctly to server");
                    const db = client.db(DbName);
                    const col = db.collection('ChiTietHopDong');
                    console.log(managerId);

                    col.find({ idHopDong:idHopDong}).sort({ _id: -1 }).toArray(function (err, docs) {
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

    }
};