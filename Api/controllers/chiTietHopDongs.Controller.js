const jwt = require('jsonwebtoken');
const {DbUrl, DbName, soItemMoiPage} = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const moment = require('moment');
const trangThaiHopDongController = require('./trangThaiHopDongController');
module.exports = {

    LayDanhSachCTHD_TheoIdHD: async function (req, res, next) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            let idHopDong = ObjectId(req.query.id);
            await client.connect();
            const db = client.db(DbName);
            const colCTHD = db.collection('ChiTietHopDong');
            let arrCTHD = await colCTHD.find({idHopDong: idHopDong}).sort({ngayTraLai: 1}).toArray();
            console.log(arrCTHD);
            res.status(200).json(arrCTHD);
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    LayCTHD_TheoId: async function (req, res, next) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            let idCTHD = ObjectId(req.params.id);
            await client.connect();
            const db = client.db(DbName);
            const colCTHD = db.collection('ChiTietHopDong');
            let CTHD = await colCTHD.find({_id: idCTHD}).next();
            res.status(200).json(CTHD);
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    DongLaiHopDong: async function (req, res) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        var token = req.query.token;
        try {
            let tokenResult = await jwt.verify(token, process.env.SECRET_KEY);
            const userId = ObjectId(tokenResult.payload.userId);
            let idCTHD = ObjectId(req.body.id);
            let dataPhieuThu = req.body.dataPhieuThu;
            await client.connect();
            const db = client.db(DbName);
            const colCTHD = db.collection('ChiTietHopDong');
            const colLS = db.collection('LichSu');
            let r = await colCTHD.updateOne({_id: idCTHD}, {
                $set: {
                    type: 1,
                    "phieuThu.nguoiDong": dataPhieuThu.nguoiDong,
                    "phieuThu.ngayDong": new Date(dataPhieuThu.ngayDong),
                    "phieuThu.phiKhac": dataPhieuThu.phiKhac,
                    "phieuThu.ghiChu": dataPhieuThu.ghiChu,
                }
            }, {upsert: true});
            let r2 = await colLS.insertOne({
                ngayTraLai: req.body.ngayTraLai,
                nguoiDong: dataPhieuThu.nguoiDong,
                ngayDong: new Date(dataPhieuThu.ngayDong),
                phiKhac: dataPhieuThu.phiKhac,
                ghiChu: dataPhieuThu.ghiChu,
                type: 0,
                ngayThucHien: new Date(),
                idHopDong: ObjectId(req.body.idHopDong),
                idNguoiThucHien: userId
            });
            client.close();
            trangThaiHopDongController.KiemTraTrangThaiHopDong(ObjectId(req.body.idHopDong)).then(() => {
                res.status(200).json({
                    status: 'ok',
                    message: 'Đóng lãi thành công !'
                });
            })

        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Đóng lãi thất bại !' + err,
            });
        }
    },

    GiaHanHopDong: async function (req, res) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            let idHD = ObjectId(req.body.id);
            let soLanThem = parseInt(req.body.soLanThem);

            let tokenResult = await jwt.verify(req.query.token, process.env.SECRET_KEY);
            const userId = ObjectId(tokenResult.payload.userId);
            await client.connect();
            const db = client.db(DbName);
            const colHD = db.collection('HopDong');
            const colCTHD = db.collection('ChiTietHopDong');
            const colLichSu = db.collection('LichSu');
            let resHopDong = await colHD.find({_id: idHD}).next();
            let resCTHD = await colCTHD.find({idHopDong: idHD, type: {'$in': [0, 1]}}).sort({ngayTraLai: -1}).next();
            // console.log(resHopDong);
            // console.log(resCTHD);
            let ngayTraLaiCuoiCung = resCTHD.ngayTraLai;
            const {thongTinHopDong, _id} = resHopDong;
            const {tongTienVay, cachTinhLai, soKyDongLai, giaTriLaiSuat, kieuDongLai, soLanTra} = thongTinHopDong;
            GiaHanChiTietHopDong(soLanThem, ngayTraLaiCuoiCung, tongTienVay, soKyDongLai, cachTinhLai, giaTriLaiSuat, kieuDongLai, _id, soLanTra).then(async () => {

                let r5 = await colLichSu.insertOne({
                    soKyGiaHan: soLanThem,
                    lyDo: req.body.lyDo,
                    type: 2,
                    ngayThucHien: new Date(),
                    idHopDong: ObjectId(_id),
                    idNguoiThucHien: userId
                });
                client.close();
                trangThaiHopDongController.KiemTraTrangThaiHopDong(ObjectId(_id)).then(() => {
                    res.status(200).json({
                        status: 'ok',
                        message: 'Gia hạn thành công !'
                    });
                });
            }).catch((e) => {
                res.status(400).json({
                    status: "fail",
                    message: 'Gia hạn thất bại !' + e,

                });
            })
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Gia hạn thất bại !' + err,

            });
        }
    },

    VayThemHopDong: async function (req, res, next) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            let idHD = ObjectId(req.body.id);
            let {ngayVayThem, tienVayThem, ghiChu} = req.body.thongTinVayThem;
            let tokenResult = await jwt.verify(req.query.token, process.env.SECRET_KEY);
            const userId = ObjectId(tokenResult.payload.userId);
            await client.connect();
            const db = client.db(DbName);
            const colHD = db.collection('HopDong');
            const colCTHD = db.collection('ChiTietHopDong');
            const colLS = db.collection('LichSu');
            let resHopDong = await colHD.find({_id: idHD}).next();
            const {ngayVay, tongTienVay, soKyDongLai, cachTinhLai, giaTriLaiSuat, soLanTra, ngayTraGoc, kieuDongLai} = resHopDong.thongTinHopDong;
            //  console.log(JSON.stringify(resHopDong));
            let resLanVayThemCuoi = await colLS.find({idHopDong: idHD, type: 4}).sort({ngayVayThem: -1}).next();
            let resCTHDBeNhat = await colCTHD.find({
                idHopDong: idHD,
                type: {'$in': [0, 1]}
            }).sort({ngayTraLai: 1}).next();
            let resCTHDLonNhat = await colCTHD.find({idHopDong: idHD, type: {'$in': [3]}}).sort({ngayTraLai: 1}).next();
            //console.log(resLanVayThemCuoi);
            if (resLanVayThemCuoi !== null) {
                if (Object.keys(resLanVayThemCuoi).length !== 0) {
                    if (moment(ngayVayThem).utc().format('YYYY-MM-DD') <= moment(resLanVayThemCuoi.ngayVayThem).utc().format('YYYY-MM-DD')) {
                        res.status(400).json({
                            status: "fail",
                            message: 'Ngày vay thêm không được nhỏ hơn ngày vay thêm của lần vay thêm trước !',
                        });
                        return;
                    }
                }
            }

            if (cachTinhLai === 0) {                //Tính lãi ngày
                if (kieuDongLai === 0) {            //Trả sau
                    if (moment(ngayVayThem) < (moment(resCTHDBeNhat.ngayTraLai).subtract(soKyDongLai - 1, 'days'))) {
                        res.status(400).json({
                            status: "fail",
                            message: 'Ngày vay thêm không được nhỏ hơn ngày vay !',
                        });
                        return;
                    }
                    if (moment(ngayVayThem) >= moment(resCTHDLonNhat.ngayTraLai)) {
                        res.status(400).json({
                            status: "fail",
                            message: 'Ngày vay thêm phải nhỏ hơn ngày tất toán !',
                        });
                        return;
                    }
                } else if (kieuDongLai === 1)        //Trả trước
                {
                    if (moment(ngayVayThem) < (moment(resCTHDBeNhat.ngayTraLai))) {
                        res.status(400).json({
                            status: "fail",
                            message: 'Ngày vay thêm không được nhỏ hơn ngày vay !',
                        });
                        return;
                    }
                    if (moment(ngayVayThem) >= moment(resCTHDLonNhat.ngayTraLai).add(soKyDongLai - 1, 'days')) {
                        res.status(400).json({
                            status: "fail",
                            message: 'Ngày vay thêm phải nhỏ hơn ngày tất toán !',
                        });
                        return;
                    }
                }
            } else if (cachTinhLai === 1) {             //Tính lãi tháng
                if (kieuDongLai === 0) {            //Trả sau
                    if (moment(ngayVayThem) < (moment(resCTHDBeNhat.ngayTraLai)).subtract(soKyDongLai, 'months')) {
                        res.status(400).json({
                            status: "fail",
                            message: 'Ngày vay thêm không được nhỏ hơn ngày vay !',
                        });
                        return;
                    }
                    if (moment(ngayVayThem) >= moment(resCTHDLonNhat.ngayTraLai)) {
                        res.status(400).json({
                            status: "fail",
                            message: 'Ngày vay thêm phải nhỏ hơn ngày tất toán !',
                        });
                        return;
                    }
                } else if (kieuDongLai === 1)         //Trả trước
                {
                    if (moment(ngayVayThem) < (moment(resCTHDBeNhat.ngayTraLai))) {
                        res.status(400).json({
                            status: "fail",
                            message: 'Ngày vay thêm không được nhỏ hơn ngày vay !',
                        });
                        return;
                    }
                    if (moment(ngayVayThem) >= moment(resCTHDLonNhat.ngayTraLai)) {
                        res.status(400).json({
                            status: "fail",
                            message: 'Ngày vay thêm phải nhỏ hơn ngày tất toán !',
                        });
                        return;
                    }
                }
            }

            TinhToanVayThemHopDong(idHD, ngayVayThem, tienVayThem, cachTinhLai, kieuDongLai, tongTienVay, soKyDongLai, giaTriLaiSuat);
            let r2 = await colLS.insertOne({
                ngayVayThem: new Date(ngayVayThem),
                tienVayThem: parseInt(tienVayThem),
                ghiChu: ghiChu,
                type: 4,
                ngayThucHien: new Date(),
                idHopDong: idHD,
                idNguoiThucHien: userId
            });
            res.status(200).json({
                status: "ok",
                message: 'Ok nhé !',
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Gia hạn thất bại !' + err,

            });
        }
    },

    TraBotGoc: async function (req, res, next) {
        //Chưa làm
    },

    TatToanHopDong: async function (req, res, next) {
        console.log('req.body.tienTatToan');
        console.log(req.body.tienTatToan);
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            await client.connect();
            const db = client.db(DbName);
            const col = db.collection('HopDong');
            let idHD = ObjectId(req.body.id);
            console.log(idHD);
            let r = await col.updateOne({_id: idHD},
                {
                    $set: {
                        trangThaiHopDong: 3,
                        ngayTatToan:new Date(req.body.ngayTatToan),
                        tienTatToan:req.body.tienTatToan
                    }
                },{upsert: true});
            client.close();
            console.log(r);
            if (r.result.ok === 1) {
                res.status(200).json({
                    status: 'ok',
                    message: 'Tất toán thành công !'
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Sửa thất bại !'
                });
            }
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Sửa thất bại !' + err,
            });
        }
    },

    TinhTienTatToan: async function (req, res) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            var idHD = ObjectId(req.body.id);
            var ngayTatToan = req.body.ngayTatToan;
            await client.connect();
            const db = client.db(DbName);
            const colHD = db.collection('HopDong');
            const colCTHD = db.collection('ChiTietHopDong');
            let resTTHD = await colHD.find({_id: idHD}).next();
            //console.log(resTTHD);
            const {ngayVay, tongTienVay, soKyDongLai, cachTinhLai, giaTriLaiSuat, soLanTra, ngayTraGoc, kieuDongLai} = resTTHD.thongTinHopDong;

            let tongTienPhaiDong = 0;
            if (cachTinhLai === 0) {                         //Tính lãi ngày
                if (kieuDongLai === 0) {                   //Trả sau
                    let ngayDongLaiGanNhat = await colCTHD.find({
                        idHopDong: idHD,
                        type: {'$in': [0]},
                        ngayTraLai: {'$gte': moment(ngayTatToan).startOf('day').toDate()}
                    }).next();
                    console.log(ngayDongLaiGanNhat);
                    let soNgayTruRa = Math.round(moment.duration(moment(ngayDongLaiGanNhat.ngayTraLai).diff(moment(ngayTatToan))).asDays());
                    let soNgayCuaKyCu = soKyDongLai - soNgayTruRa;
                    tongTienPhaiDong = tongTienPhaiDong + (soNgayCuaKyMoi * ngayDongLaiGanNhat.tienLai / soKyDongLai);
                    let resCTHD = await colCTHD.find({
                        idHopDong: idHD,
                        type: {'$in': [0]},
                        ngayTraLai: {'$lte': moment(ngayTatToan).startOf('day').toDate()}
                    }).sort({ngayTraLai: 1}).toArray();
                    //console.log(resCTHD);
                    for (const item of resCTHD) {
                        tongTienPhaiDong += item.tienLai;
                    }
                    if (tongTienPhaiDong < 0) {
                        res.status(400).json({
                            status: "fail",
                            message: tongTienPhaiDong,
                        });
                        return;
                    }
                    res.status(200).json({
                        status: "ok",
                        message: tongTienPhaiDong,
                    });
                    return;

                } else if (kieuDongLai === 1) {                //Trả trước
                    let ngayDongLaiGanNhat = await colCTHD.find({
                        idHopDong: idHD,
                        type: {'$in': [0]},
                        ngayTraLai: {'$lte': moment(ngayTatToan).startOf('day').toDate()}
                    }).sort({ngayTraLai: -1}).next();
                    let soNgayTruRa = Math.round(moment.duration(moment(ngayTatToan).diff(moment(ngayDongLaiGanNhat.ngayTraLai))).asDays());
                    let soNgayCuaKyMoi = soKyDongLai - (soKyDongLai - soNgayTruRa);
                    console.log(soNgayCuaKyMoi)
                    tongTienPhaiDong += (soNgayCuaKyMoi * ngayDongLaiGanNhat.tienLai / soKyDongLai);
                    console.log(tongTienPhaiDong);
                    let resCTHD = await colCTHD.find({
                        idHopDong: idHD,
                        type: {'$in': [0]},
                        ngayTraLai: {'$lte': moment(ngayTatToan).startOf('day').toDate()}
                    }).sort({ngayTraLai: 1}).toArray();
                    resCTHD.forEach((item, index) => {
                        if (index !== 0) {
                            console.log(item.tienLai)
                            tongTienPhaiDong += item.tienLai;
                        }

                    })
                    if (tongTienPhaiDong < 0) {
                        res.status(400).json({
                            status: "fail",
                            message: tongTienPhaiDong,
                        });
                        return;
                    }
                    res.status(200).json({
                        status: "ok",
                        message: tongTienPhaiDong,
                    });
                    return;
                }
            } else if (cachTinhLai === 1) {                              //Tính lãi theo tháng
                let mucLaiNgay = Math.round(((tongTienVay/100)*giaTriLaiSuat)/30);
                //console.log(mucLaiNgay)
                if (kieuDongLai === 0) {                     //Trả sau
                    let ngayDongLaiGanNhat = await colCTHD.find({
                        idHopDong: idHD,
                        type: {'$in': [0]},
                        ngayTraLai: {'$gte': moment(ngayTatToan).startOf('day').toDate()}
                    }).next();
                   // console.log(ngayDongLaiGanNhat.ngayTraLai);
                  //  console.log(ngayTatToan);
                    let soNgayTruRa = Math.round(moment.duration(moment(ngayDongLaiGanNhat.ngayTraLai).diff(moment(ngayTatToan).startOf('day').subtract(1,'days'))).asDays());
                  //  console.log(soNgayTruRa);
                    if(soNgayTruRa>90) {soNgayTruRa =90}
                    let soNgayCuaKyCu = ((soKyDongLai*30) - soNgayTruRa)+1;
                   // console.log(soNgayCuaKyCu);
                    tongTienPhaiDong = Math.round(tongTienPhaiDong + (soNgayCuaKyCu * mucLaiNgay));
                    //tongTienPhaiDong = Math.round(soNgayTruRa*mucLaiNgay*tongTienVay);
                    //console.log('tongTienPhaiDong');
                 //   console.log(tongTienPhaiDong);
                    let resCTHD = await colCTHD.find({
                        idHopDong: idHD,
                        type: {'$in': [0]},
                        ngayTraLai: {'$lt': moment(ngayTatToan).startOf('day').toDate()}
                    }).sort({ngayTraLai: 1}).toArray();
                    //console.log(resCTHD);
                    resCTHD.forEach((item, index) => {
                            tongTienPhaiDong += item.tienLai;
                    })
                    if (tongTienPhaiDong < 0) {
                        res.status(400).json({
                            status: "fail",
                            message: tongTienPhaiDong,
                        });
                        return;
                    }
                    res.status(200).json({
                        status: "ok",
                        message: tongTienPhaiDong,
                    });
                    return;
                } else if (kieuDongLai === 1) {                   //Trả trước
                    let ngayDongLaiGanNhat = await colCTHD.find({
                        idHopDong: idHD,
                        type: {'$in': [0]},
                        ngayTraLai: {'$lte': moment(ngayTatToan).startOf('day').toDate()}
                    }).sort({ngayTraLai:-1}).next();
                     console.log('ngayDongLaiGanNhat.ngayTraLai');
                     console.log(ngayDongLaiGanNhat.ngayTraLai);
                      console.log('ngayTatToan');
                      console.log(ngayTatToan);
                    let soNgayTruRa = Math.round(moment.duration(moment(ngayTatToan).startOf('day').diff(moment(ngayDongLaiGanNhat.ngayTraLai))).asDays());
                      console.log('soNgayTruRa');
                      console.log(soNgayTruRa);
                    if(soNgayTruRa>90) {soNgayTruRa =90}
                    let soNgayCuaKyCu = ((soKyDongLai*30) - soNgayTruRa);
                     console.log('soNgayCuaKyCu');
                    console.log(soNgayCuaKyCu);
                    tongTienPhaiDong = Math.round(tongTienPhaiDong + ((soNgayTruRa) * mucLaiNgay));
                  //  tongTienPhaiDong = Math.round(soNgayTruRa*mucLaiNgay*tongTienVay);
                    console.log('tongTienPhaiDong');
                       console.log(tongTienPhaiDong);
                    let resCTHD = await colCTHD.find({idHopDong: idHD, type: {'$in': [0]}, ngayTraLai: {'$lt': moment(ngayDongLaiGanNhat.ngayTraLai).startOf('day').toDate()}
                    }).sort({ngayTraLai: 1}).toArray();
                 //   console.log(resCTHD);
                    resCTHD.forEach((item, index) => {

                          //  console.log(index);
                            tongTienPhaiDong += item.tienLai;
                           // console.log(tongTienPhaiDong)

                    })
                    if (tongTienPhaiDong < 0) {
                        res.status(400).json({
                            status: "fail",
                            message: tongTienPhaiDong,
                        });
                        return;
                    }
                    res.status(200).json({
                        status: "ok",
                        message: tongTienPhaiDong,
                    });
                    return;
                }
            }
            client.close();
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Tính tiền tất toán thất bại !' + err,
            });
        }
    },

    XoaPhieuThu: async function (req, res) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        var token = req.query.token;
        try {
            let tokenResult = await jwt.verify(token, process.env.SECRET_KEY);
            const userId = ObjectId(tokenResult.payload.userId);
            let idCTHD = ObjectId(req.body.id);
            let dataPhieuThu = req.body.dataPhieuThu;
            await client.connect();
            const db = client.db(DbName);
            const col = db.collection('ChiTietHopDong');
            const colLS = db.collection('LichSu');
            let result = await col.updateOne({_id: idCTHD}, {
                $set: {
                    type: 0,
                    phieuThu: {},

                }
            },);
            let r2 = colLS.insertOne({
                ngayTraLai: req.body.ngayTraLai,
                nguoiDong: dataPhieuThu.nguoiDong,
                ngayDong: new Date(dataPhieuThu.ngayDong),
                phiKhac: dataPhieuThu.phiKhac,
                ghiChu: dataPhieuThu.ghiChu,
                type: 1,
                ngayThucHien: new Date(),
                idHopDong: ObjectId(req.body.idHopDong),
                idNguoiThucHien: userId
            });
            client.close();
            trangThaiHopDongController.KiemTraTrangThaiHopDong(ObjectId(req.body.idHopDong)).then(() => {
                res.status(200).json({
                    status: 'ok',
                    message: 'Xóa phiếu thu thành công !'
                });
            });

        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Xóa phiếu thu thất bại !' + err,

            });
        }
    },
}

async function GiaHanChiTietHopDong(soLanThem, ngayTraLaiCuoiCung, tongTienVay, soKyDongLai, cachTinhLai, giaTriLaiSuat, kieuDongLai, idHD, soLanTra) {
    let idHopDong = ObjectId(idHD);
    const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    await client.connect();
    const db = client.db(DbName);
    const colHD = db.collection('HopDong');
    const colCTHD = db.collection('ChiTietHopDong');
    let arrKyDongLai = [];
    if (cachTinhLai === 0) {                         //Tính lãi ngày
        let mucLaiNgay = (tongTienVay / 1000000) * giaTriLaiSuat;
        if (kieuDongLai === 0) {                   //Trả sau
            for (let i = 0; i < soLanThem; i++) {
                ngayTraLaiCuoiCung = moment(ngayTraLaiCuoiCung).add(soKyDongLai, "days").toDate();
                let kyDongLai = {
                    ngayTraLai: ngayTraLaiCuoiCung,
                    tienLai: mucLaiNgay * parseInt(soKyDongLai),
                    tienGoc: 0,
                    phieuThu: {},
                    type: 0,
                    idHopDong: idHopDong
                }
                arrKyDongLai.push(kyDongLai)
            }
            let r = await colCTHD.insertMany(arrKyDongLai);
            let r2 = await colCTHD.deleteOne({type: 3, idHopDong: idHopDong});
            let r3 = await colCTHD.insertOne({
                ngayTraLai: ngayTraLaiCuoiCung,
                tienLai: 0,
                tienGoc: parseInt(tongTienVay),
                phieuThu: {},
                type: 3,
                idHopDong: idHopDong
            });
        } else if (kieuDongLai === 1) {                //Trả trước
            for (let i = 0; i < soLanThem; i++) {
                ngayTraLaiCuoiCung = moment(ngayTraLaiCuoiCung).add(soKyDongLai, "days").toDate();
                let kyDongLai = {
                    ngayTraLai: ngayTraLaiCuoiCung,
                    tienLai: mucLaiNgay * parseInt(soKyDongLai),
                    tienGoc: 0,
                    phieuThu: {},
                    type: 0,
                    idHopDong: idHopDong
                }
                arrKyDongLai.push(kyDongLai)
            }
            ngayTraLaiCuoiCung = moment(ngayTraLaiCuoiCung).add(soKyDongLai, "days").toDate();
            let r = await colCTHD.insertMany(arrKyDongLai);
            let r2 = await colCTHD.deleteOne({type: 3, idHopDong: idHopDong});
            let r3 = await colCTHD.insertOne({
                ngayTraLai: ngayTraLaiCuoiCung,
                tienLai: 0,
                tienGoc: parseInt(tongTienVay),
                phieuThu: {},
                type: 3,
                idHopDong: idHopDong
            });
        }
    } else if (cachTinhLai === 1) {                      //Tính lãi theo tháng
        let mucLaiThang = (tongTienVay / 100) * giaTriLaiSuat;
        if (kieuDongLai === 0) {                     //Trả sau
            for (let i = 0; i < soLanThem; i++) {
                ngayTraLaiCuoiCung = moment(ngayTraLaiCuoiCung).add(soKyDongLai, "months").toDate();
                let kyDongLai = {
                    ngayTraLai: ngayTraLaiCuoiCung,
                    tienLai: mucLaiThang * parseInt(soKyDongLai),
                    tienGoc: 0,
                    phieuThu: {},
                    type: 0,
                    idHopDong: idHopDong
                }
                arrKyDongLai.push(kyDongLai)
            }
            let r = await colCTHD.insertMany(arrKyDongLai);
            let r2 = await colCTHD.deleteOne({type: 3, idHopDong: idHopDong});
            let r3 = await colCTHD.insertOne({
                ngayTraLai: ngayTraLaiCuoiCung,
                tienLai: 0,
                tienGoc: parseInt(tongTienVay),
                phieuThu: {},
                type: 3,
                idHopDong: idHopDong
            });
        } else if (kieuDongLai === 1) {                   //Trả trước
            for (let i = 0; i < soLanThem; i++) {
                ngayTraLaiCuoiCung = moment(ngayTraLaiCuoiCung).add(soKyDongLai, "months").toDate();
                let kyDongLai = {
                    ngayTraLai: ngayTraLaiCuoiCung,
                    tienLai: mucLaiThang * parseInt(soKyDongLai),
                    tienGoc: 0,
                    phieuThu: {},
                    type: 0,
                    idHopDong: idHopDong
                }
                arrKyDongLai.push(kyDongLai)
            }
            ngayTraLaiCuoiCung = moment(ngayTraLaiCuoiCung).add(soKyDongLai, "months").toDate();
            let r = await colCTHD.insertMany(arrKyDongLai);
            let r2 = await colCTHD.deleteOne({type: 3, idHopDong: idHopDong});
            let r3 = await colCTHD.insertOne({
                ngayTraLai: ngayTraLaiCuoiCung,
                tienLai: 0,
                tienGoc: parseInt(tongTienVay),
                phieuThu: {},
                type: 3,
                idHopDong: idHopDong
            });
        }
    }
    let r4 = await colHD.updateOne({_id: idHopDong},
        {
            $set: {
                'thongTinHopDong.soLanTra': soLanTra + soLanThem,
                'thongTinHopDong.ngayTraGoc': ngayTraLaiCuoiCung
            }
        });

}

async function TinhToanVayThemHopDong(idHD, ngayVayThem, tienVayThem, cachTinhLai, kieuDongLai, tongTienVay, soKyDongLai, giaTriLaiSuat) {
    const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    await client.connect();
    const db = client.db(DbName);
    const colHD = db.collection('HopDong');
    const colCTHD = db.collection('ChiTietHopDong');
    let resCTHD = await colCTHD.find({idHopDong: idHD, type: {'$in': [0, 1]}}).sort({ngayTraLai: 1}).toArray();
    let tongTienVayMoi = tongTienVay + parseInt(tienVayThem);
    //console.log(resCTHD);
    if (cachTinhLai === 0) {                         //Tính lãi ngày
        let mucLaiNgay = (tongTienVay / 1000000) * giaTriLaiSuat;
        let mucLaiNgayMoi = (tongTienVayMoi / 1000000) * giaTriLaiSuat;
        if (kieuDongLai === 0) {                   //Trả sau
            let ngayDongLaiGanNhat = await colCTHD.find({
                idHopDong: idHD,
                type: {'$in': [0, 1]},
                ngayTraLai: {'$gte': new Date(ngayVayThem)}
            }).next();
            let soNgayTruRa = Math.round(moment.duration(moment(ngayDongLaiGanNhat.ngayTraLai).diff(moment(ngayVayThem))).asDays());
            //console.log(soNgayTruRa)
            let soNgayCuaKyCu = soKyDongLai - soNgayTruRa;
            let r1 = await colCTHD.updateOne({_id: ngayDongLaiGanNhat._id}, {
                $set: {
                    tienLai: (mucLaiNgay * soNgayCuaKyCu) + (mucLaiNgayMoi * soNgayTruRa)
                }
            })
            for (const item of resCTHD) {
                //console.log(item);
                if (moment(item.ngayTraLai) > moment(ngayDongLaiGanNhat.ngayTraLai)) {
                    let r2 = colCTHD.updateOne({_id: item._id}, {
                        $set: {
                            tienLai: mucLaiNgayMoi * soKyDongLai
                        }
                    })
                }
            }
            let r3 = colHD.updateOne({_id: idHD}, {$set: {'thongTinHopDong.tongTienVay': tongTienVayMoi}});
            let r4 = colCTHD.updateOne({idHopDong: idHD, type: 3}, {$set: {'tienGoc': tongTienVayMoi}});

        } else if (kieuDongLai === 1) {                //Trả trước
            let ngayDongLaiGanNhat = await colCTHD.find({
                idHopDong: idHD,
                type: {'$in': [0, 1]},
                ngayTraLai: {'$lte': new Date(ngayVayThem)}
            }).sort({ngayTraLai: -1}).next();
            // console.log('ngayDongLaiGanNhat');
            // console.log(ngayDongLaiGanNhat);
            let soNgayTruRa = Math.round(moment.duration(moment(ngayVayThem).diff(moment(ngayDongLaiGanNhat.ngayTraLai))).asDays());
            // console.log('soNgayTruRa')
            // console.log(soNgayTruRa)
            let soNgayCuaKyMoi = soKyDongLai - soNgayTruRa;
            // console.log('soNgayCuaKyCu');
            // console.log(soNgayCuaKyMoi);
            // console.log(mucLaiNgay*soNgayCuaKyMoi)
            // console.log(mucLaiNgay*soNgayCuaKyMoi)
            let r1 = await colCTHD.updateOne({_id: ngayDongLaiGanNhat._id}, {
                $set: {
                    tienLai: (mucLaiNgay * soNgayTruRa) + (mucLaiNgayMoi * soNgayCuaKyMoi)
                }
            })
            for (const item of resCTHD) {
                if (moment(item.ngayTraLai) > moment(ngayDongLaiGanNhat.ngayTraLai)) {
                    let r2 = colCTHD.updateOne({_id: item._id}, {
                        $set: {
                            tienLai: mucLaiNgayMoi * soKyDongLai
                        }
                    })
                }
            }
            let r3 = colHD.updateOne({_id: idHD}, {$set: {'thongTinHopDong.tongTienVay': tongTienVayMoi}});
            let r4 = colCTHD.updateOne({idHopDong: idHD, type: 3}, {$set: {'tienGoc': tongTienVayMoi}});
        }
    } else if (cachTinhLai === 1) {                      //Tính lãi theo tháng
        let mucLaiThang = (tongTienVay / 100) * giaTriLaiSuat;
        let mucLaiThangMoi = (tongTienVayMoi / 100) * giaTriLaiSuat;
        if (kieuDongLai === 0) {                     //Trả sau
            let ngayDongLaiGanNhat = await colCTHD.find({
                idHopDong: idHD,
                type: {'$in': [0, 1]},
                ngayTraLai: {'$gte': new Date(ngayVayThem)}
            }).next();
            let soThangTruRa = Math.round(moment.duration(moment(ngayDongLaiGanNhat.ngayTraLai).diff(moment(ngayVayThem))).asMonths());
            //console.log(soNgayTruRa)
            let soThangCuaKyCu = soKyDongLai - soThangTruRa;
            let r1 = await colCTHD.updateOne({_id: ngayDongLaiGanNhat._id}, {
                $set: {
                    tienLai: (mucLaiThang * soThangCuaKyCu) + (mucLaiThangMoi * soThangTruRa)
                }
            })
            for (const item of resCTHD) {
                //console.log(item);
                if (moment(item.ngayTraLai) > moment(ngayDongLaiGanNhat.ngayTraLai)) {
                    let r2 = colCTHD.updateOne({_id: item._id}, {
                        $set: {
                            tienLai: mucLaiThangMoi * soKyDongLai
                        }
                    });
                }
            }
            let r3 = colHD.updateOne({_id: idHD}, {$set: {'thongTinHopDong.tongTienVay': tongTienVayMoi}});
            let r4 = colCTHD.updateOne({idHopDong: idHD, type: 3}, {$set: {'tienGoc': tongTienVayMoi}});
        } else if (kieuDongLai === 1) {                   //Trả trước
            let ngayDongLaiGanNhat = await colCTHD.find({
                idHopDong: idHD,
                type: {'$in': [0, 1]},
                ngayTraLai: {'$gte': new Date(ngayVayThem)}
            }).next();
            let soThangTruRa = Math.round(moment.duration(moment(ngayVayThem).diff(moment(ngayDongLaiGanNhat.ngayTraLai))).asMonths());
            //console.log(soNgayTruRa)
            let soThangCuaKyMoi = soKyDongLai - soThangTruRa;
            let r1 = await colCTHD.updateOne({_id: ngayDongLaiGanNhat._id}, {
                $set: {
                    tienLai: (mucLaiThang * soThangTruRa) + (mucLaiThangMoi * soThangCuaKyMoi)
                }
            })
            for (const item of resCTHD) {
                //console.log(item);
                if (moment(item.ngayTraLai) > moment(ngayDongLaiGanNhat.ngayTraLai)) {
                    let r2 = colCTHD.updateOne({_id: item._id}, {
                        $set: {
                            tienLai: mucLaiThangMoi * soKyDongLai
                        }
                    });
                }
            }
            let r3 = colHD.updateOne({_id: idHD}, {$set: {'thongTinHopDong.tongTienVay': tongTienVayMoi}});
            let r4 = colCTHD.updateOne({idHopDong: idHD, type: 3}, {$set: {'tienGoc': tongTienVayMoi}});
        }
    }
}