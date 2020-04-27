const jwt = require('jsonwebtoken');
const {DbUrl, DbName, soItemMoiPage, defaultImage} = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const ids = require('short-id');
const {BoDau} = require('../utils/hamHoTro');
const moment = require('moment');
const trangThaiHopDongController = require('./trangThaiHopDongController');
module.exports = {
    /*Hàm chức năng của nhân viên--------------------------------*/
    /*Hàm chức năng của manager--------------------------------*/

    LayTatCaHopDongTheoTrang: async function (req, res, next) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        //Xác định loại hợp đồng
        var arrHD;
        if (req.params.type === 'dangvay') {
            arrHD = [0, 1, 2]
        }
        if (req.params.type == 'dadong') {
            arrHD = [3]
        }
        if (req.params.type == 'choduyet') {
            arrHD = [4];
        }
       // console.log(req.params.type);
        try {
            const page = req.params.page;
            var token = req.query.token;
            let tokenResult = await jwt.verify(token, process.env.SECRET_KEY);
            const userId = ObjectId(tokenResult.payload.userId);
            //Xác định nhân viên hoặc quản lý
            var dieuKienQuery = {};
            if(req.query.usertype === 'managers'){
                dieuKienQuery = {
                    idManager: userId,
                    trangThaiXoa: false,
                    trangThaiHopDong: {'$in': arrHD}
                }

            }else if(req.query.usertype === 'users'){
                dieuKienQuery = {
                    idNguoiTaoHopDong: userId,
                    trangThaiXoa: false,
                    trangThaiHopDong: {'$in': arrHD}
                }
            }
            await client.connect();
            const db = client.db(DbName);
            const colHD = db.collection('HopDong');
            let resultHD = await colHD.find(dieuKienQuery).sort({_id: -1}).limit(soItemMoiPage).skip(soItemMoiPage * page).toArray();
            client.close();
            res.status(200).json(resultHD);
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }

    },

    LayThongTinNguoiTaoHopDongByIDHD: async function(req,res,next){

        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            let idHD = ObjectId(req.query.id);
            await client.connect();
            const db = client.db(DbName);
            const col = db.collection('NguoiDung');
            //Query những nhân viên thuộc quyền quản lý của chủ nhân viên
            let kqTimKiem = await col.find({_id:idHD}).next();
            client.close();
            res.status(200).json(kqTimKiem);
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'+err
            });
        }
    },

    TimKiemHopDong: async function (req, res, next) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        //Xác định loại hợp đồng
        var arrHD;
        if (req.params.type === 'dangvay') {
            arrHD = [0, 1, 2]
        }
        if (req.params.type === 'dadong') {
            arrHD = [3]
        }
        if (req.params.type === 'choduyet') {
            arrHD = [4]
        }
        let token = req.query.token;
        let tuKhoaTimKiem = BoDau(req.query.ten);
        try {
            //Mở token ra kiểm tra id quản lý
            let tokenResult = await jwt.verify(token, process.env.SECRET_KEY);
            let userId = ObjectId(tokenResult.payload.userId);
            let dieuKienQuery = {};
            //Xác định nhân viên hoặc quản lý
            if(req.query.usertype === 'managers'){
                dieuKienQuery = {
                    '$or': [
                        {
                            trangThaiHopDong: {'$in': arrHD},
                            idManager: userId,
                            maHopDong: {'$regex': tuKhoaTimKiem.toUpperCase(), '$options': '$i'}
                        },
                        {
                            trangThaiHopDong: {'$in': arrHD},
                            idManager: userId,
                            lowerCase: {'$regex': tuKhoaTimKiem, '$options': '$i'}
                        },
                        {
                            trangThaiHopDong: {'$in': arrHD},
                            idManager: userId,
                            email: {'$regex': tuKhoaTimKiem, '$options': '$i'}
                        },
                        {
                            trangThaiHopDong: {'$in': arrHD},
                            idManager: userId,
                            sdt: {'$regex': tuKhoaTimKiem, '$options': '$i'}
                        }
                    ]
                }
            }else if(req.query.usertype === 'users'){
                dieuKienQuery = {
                    '$or': [
                        {
                            trangThaiHopDong: {'$in': arrHD},
                            idNguoiTaoHopDong: userId,
                            maHopDong: {'$regex': tuKhoaTimKiem.toUpperCase(), '$options': '$i'}
                        },
                        {
                            trangThaiHopDong: {'$in': arrHD},
                            idNguoiTaoHopDong: userId,
                            lowerCase: {'$regex': tuKhoaTimKiem, '$options': '$i'}
                        },
                        {
                            trangThaiHopDong: {'$in': arrHD},
                            idNguoiTaoHopDong: userId,
                            email: {'$regex': tuKhoaTimKiem, '$options': '$i'}
                        },
                        {
                            trangThaiHopDong: {'$in': arrHD},
                            idNguoiTaoHopDong: userId,
                            sdt: {'$regex': tuKhoaTimKiem, '$options': '$i'}
                        }
                    ]
                }
            }
            await client.connect();
            const db = client.db(DbName);
            const col = db.collection('HopDong');
            //Query những nhân viên thuộc quyền quản lý của chủ nhân viên và quản lý tùy theo điều kiên
            let kqTimKiem = await col.find(dieuKienQuery).sort({_id: -1}).limit(15).toArray();
            client.close();
            res.status(200).json(kqTimKiem);

        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    ThemHopDong: async function (req, res, next) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            let token = req.query.token;
            let tokenResult = await jwt.verify(token, process.env.SECRET_KEY);
            const userId = ObjectId(tokenResult.payload.userId);
            const managerId = ObjectId(tokenResult.payload.managerId);
            const {tongTienVay,soKyDongLai,cachTinhLai,giaTriLaiSuat,soLanTra,kieuDongLai,ngayTraGoc,ngayVay} = req.body.thongTinHopDong;
            await client.connect();
            const db = client.db(DbName);
            let idHD = ObjectId();
           // console.log(req.body.thongTinHopDong.ngayTraGoc);
            let r = await db.collection("HopDong").insertOne({
                _id: idHD,
                maHopDong: 'HD' + ids.generate().toUpperCase(),
                tenKhachHang: req.body.tenKhachHang,
                lowerCase: BoDau(req.body.tenKhachHang),
                sdt: req.body.sdt,
                email: req.body.email,
                diaChi: req.body.diaChi,
                thongTinCMT: req.body.thongTinCMT,
                ngaySinh: new Date(req.body.ngaySinh),
                hinhAnh: defaultImage,
                thongTinHopDong: {
                    ...req.body.thongTinHopDong,
                    ngayVay: new Date(req.body.thongTinHopDong.ngayVay),
                    ngayTraGoc: new Date(req.body.thongTinHopDong.ngayTraGoc)
                },
                trangThaiHopDong:  req.query.usertype === 'managers'?0:4,
                trangThaiXoa: false,
                idNguoiTaoHopDong: userId,
                idManager: req.query.usertype === 'managers'?userId:managerId
            });
            client.close();
            TaoChiTietHopDong(new Date(ngayVay), tongTienVay, soKyDongLai, cachTinhLai, giaTriLaiSuat, soLanTra, kieuDongLai, idHD, new Date(ngayTraGoc), req.body.tenKhachHang).then(() => {
                if(req.query.usertype === 'managers'){
                    console.log('bat dau tinh')
                    trangThaiHopDongController.KiemTraTrangThaiHopDong(idHD,kieuDongLai,cachTinhLai,soKyDongLai).then(()=>{
                        console.log('da tinh xong')
                        if (r.insertedCount === 1) {
                            res.status(200).json({
                                status: 'ok',
                                message: 'Thêm thành công !'
                            });
                        }
                    })
                }else {
                    res.status(200).json({
                        status: 'ok',
                        message: 'Thêm thành công !'
                    });
                }


            }).catch((e) => {
                res.status(200).json({
                    status: 'fail',
                    message: 'Thêm thất bại !' + e
                });
            })

        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Thêm thất bại !' + err,
            });
        }
    },

    SuaHopDong: async function (req, res, next) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            await client.connect();
            const db = client.db(DbName);
            const col = db.collection('HopDong');
            let idHD = ObjectId(req.body.maHopDong.toString());
            let r = await col.updateOne({_id: idHD},
                {
                    $set: {
                        tenKhachHang: req.body.tenKhachHang,
                        lowerCase: BoDau(req.body.tenKhachHang),
                        sdt: req.body.sdt,
                        email: req.body.email,
                        diaChi: req.body.diaChi,
                        thongTinCMT: req.body.thongTinCMT,
                        ngaySinh: new Date(req.body.ngaySinh),
                        hinhAnh: defaultImage,
                        'thongTinHopDong.tinChap': req.body.tinChap,
                        'thongTinHopDong.ghiChu': req.body.ghiChu
                    }
                });
            client.close();
            console.log(r);
            if (r.result.ok === 1) {
                res.status(200).json({
                    status: 'ok',
                    message: 'Sửa thành công !'
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

    XoaHopDong: async function (req, res, next) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            const idHopDong = ObjectId(req.body.idHopDong);
            await client.connect();
            const db = client.db(DbName);
            const colHD = db.collection('HopDong');

            let resultHD = await colHD.updateOne({_id:idHopDong},{
                $set:{
                    trangThaiXoa:true
                }
            });
            res.status(200).json({
                status: 'ok',
                message: 'Xoa thành công !'
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }

    },

    Manager_LayHopDongTheoId: function (req, res, next) {
        let token = req.query.token;
        let hopdongId = req.query.id;
        try {
            //Mở token ra kiểm tra id quản lý
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
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
    },

    DuyetHopDong: async function (req, res, next) {
        try {

            let idHD = ObjectId(req.body.idHopDong);
            trangThaiHopDongController.KiemTraTrangThaiHopDong(idHD).then(()=>{
                res.status(200).json({
                    status: 'ok',
                    message: 'Duyệt hợp đồng thành công !'
                });
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Duyệt hợp đồng thất bại !' + err,
            });
        }
    },
    CheckTrangThaiHopDongMoiNgay: async function () {
        console.log('check trang thai hd')
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            await client.connect();
            const db = client.db(DbName);
            const colHD = db.collection('HopDong');

            let resToanBoHD = await colHD.find({trangThaiHopDong:{'$in':[0,1,2]},trangThaiXoa:false}).toArray();
            client.close();
            for(const item of resToanBoHD){
              trangThaiHopDongController.KiemTraTrangThaiHopDong(ObjectId(item._id)).then(()=>{});
            }
        } catch (e) {
            console.log(e);
        }
    }

}

async function TaoChiTietHopDong(ngayVay, tongTienVay, soKyDongLai, cachTinhLai, giaTriLaiXuat, soLanTra, kieuDongLai, idHopDong, ngayTraGoc,tenKhachHang) {
    const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    await client.connect();
    const db = client.db(DbName);
    const colChiTietHD = db.collection('ChiTietHopDong');
    ngayVay = moment(ngayVay).startOf('day').toDate();
    if (cachTinhLai === 0) {       //cachTinhLai: ngay
        let mucLaiNgay = (tongTienVay / 1000000) * giaTriLaiXuat;
        //kieuDongLai: 0= Trả sau, 1 = Trả trước
        if (kieuDongLai === 0) {            //Trả sau
           // ngayVay.setDate(ngayVay.getDate() - 1);
            ngayVay = moment(ngayVay).subtract(1,'days');
            for (let i = 0; i < soLanTra; i++) {
                ngayVay = moment(ngayVay).add(soKyDongLai, "days").toDate();
                let r = await colChiTietHD.insertOne({
                    ngayTraLai: ngayVay,
                    tienLai: mucLaiNgay * soKyDongLai,
                    tienGoc: 0,
                    phieuThu: {},
                    type: 0,
                    idHopDong: idHopDong
                });
            }
            let r = await colChiTietHD.insertOne({
                ngayTraLai: ngayTraGoc,
                tienLai: 0,
                tienGoc: parseInt(tongTienVay),
                phieuThu: {},
                type: 3,
                idHopDong: idHopDong
            });

            client.close();
        } else if (kieuDongLai === 1) {       //Trả trước
            for (let i = 0; i < soLanTra - 1; i++) {
                if (i === 0) {
                    let r = await colChiTietHD.insertOne({
                        ngayTraLai: ngayVay,
                        tienLai: mucLaiNgay * soKyDongLai,
                        tienGoc: 0,
                        phieuThu: {
                            ghiChu:'',
                            ngayDong:new Date(),
                            nguoiDong:tenKhachHang,
                            phiKhac:''
                        },
                        type: 1,
                        idHopDong: idHopDong
                    });
                }
                ngayVay = moment(ngayVay).add(soKyDongLai, "days").toDate();
                // ngayVay.setDate(ngayVay.getDate()+parseInt(soKyDongLai));
                let r = await colChiTietHD.insertOne({
                    ngayTraLai: ngayVay,
                    tienLai: mucLaiNgay * soKyDongLai,
                    tienGoc: 0,
                    phieuThu: {},
                    type: 0,
                    idHopDong: idHopDong
                });
            }
            let r = await colChiTietHD.insertOne({
                ngayTraLai: ngayTraGoc,
                tienLai: 0,
                tienGoc: parseInt(tongTienVay),
                phieuThu: {},
                type: 3,
                idHopDong: idHopDong
            });
            client.close();
        }
    } else if (cachTinhLai === 1) {      //cachTinhLai: thang
        let mucLaiThang = (tongTienVay / 100) * giaTriLaiXuat;
        //kieuDongLai: 0= Trả sau, 1 = Trả trước
        if (kieuDongLai === 0) {            //Trả sau
            for (let i = 0; i < soLanTra; i++) {
                ngayVay = moment(ngayVay).add(soKyDongLai, "months").toDate();
                let r = await colChiTietHD.insertOne({
                    ngayTraLai: ngayVay,
                    tienLai: mucLaiThang*soKyDongLai,
                    tienGoc: 0,
                    phieuThu: {},
                    type: 0,
                    idHopDong: idHopDong
                });
            }
            let r = await colChiTietHD.insertOne({
                ngayTraLai: ngayTraGoc,
                tienLai: 0,
                tienGoc: parseInt(tongTienVay),
                phieuThu: {},
                type: 3,
                idHopDong: idHopDong
            });
            client.close();
        } else if (kieuDongLai === 1) {            //Trả trước
            for (let i = 0; i < soLanTra; i++) {
                if (i === 0) {
                    let r = await colChiTietHD.insertOne({
                        ngayTraLai: ngayVay,
                        tienLai: mucLaiThang*soKyDongLai,
                        tienGoc: 0,
                        phieuThu: {
                            ghiChu:'',
                            ngayDong:new Date(),
                            nguoiDong:tenKhachHang,
                            phiKhac:''
                        },
                        type: 1,
                        idHopDong: idHopDong
                    });
                } else if (i !== 0) {
                    ngayVay = moment(ngayVay).add(soKyDongLai, "months").toDate();
                    // ngayVay.setMonth(ngayVay.getMonth()+parseInt(soKyDongLai));
                    let r = await colChiTietHD.insertOne({
                        ngayTraLai: ngayVay,
                        tienLai: mucLaiThang*soKyDongLai,
                        tienGoc: 0,
                        phieuThu: {},
                        type: 0,
                        idHopDong: idHopDong
                    });
                }
            }
            let r = await colChiTietHD.insertOne({
                ngayTraLai: ngayTraGoc,
                tienLai: 0,
                tienGoc: parseInt(tongTienVay),
                phieuThu: {},
                type: 3,
                idHopDong: idHopDong
            });
            client.close();
        }
    }
}
