const jwt = require('jsonwebtoken');
const {DbUrl, DbName, soItemMoiPage, defaultImage} = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const ids = require('short-id');
const {BoDau} = require('../utils/hamHoTro');
const moment = require('moment');
module.exports = {
    KiemTraTrangThaiHopDong: async function (idHD) {
        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        await client.connect();
        const db = client.db(DbName);
        const colHD = db.collection('HopDong');
        const colCTHD = db.collection('ChiTietHopDong');
        let resThongTinHopDong = await colHD.find({_id:idHD}).next();
        const {soKyDongLai,cachTinhLai,kieuDongLai} = resThongTinHopDong.thongTinHopDong;
        //Ngày trả lãi đầu tiên chưa có phiếu thu
        let resCTHDBeNhat = await colCTHD.find({idHopDong:idHD,type:{'$in':[0]}}).sort({ngayTraLai:1}).next();
        if(resCTHDBeNhat === null ||resCTHDBeNhat === undefined){
            let r1 = colHD.updateOne({_id:idHD},{
                $set:{
                    trangThaiHopDong:0
                }
            });
            client.close();
            return ;
        }
        //Ngày tất toán
        let resNgayTatToan = await colCTHD.find({idHopDong:idHD,type:{'$in':[3]}}).next();
        // Đỏi trạng thái thành quá hạn
        if(moment(resNgayTatToan.ngayTraLai)<moment(new Date())){
            let r1 = colHD.updateOne({_id:idHD},{
                $set:{
                    trangThaiHopDong:2
                }
            });
            client.close();
            return ;
        }
        if (cachTinhLai === 0) {       //cachTinhLai: ngay
            if (kieuDongLai === 0) {            //Trả sau
                if((moment(resCTHDBeNhat.ngayTraLai))<moment(new Date())){
                    let r1 = colHD.updateOne({_id:idHD},{
                        $set:{
                            trangThaiHopDong:1
                        }
                    });
                }else {
                    let r1 = colHD.updateOne({_id:idHD},{
                        $set:{
                            trangThaiHopDong:0
                        }
                    });
                }
            } else if (kieuDongLai === 1) {       //Trả trước
                if((moment(resCTHDBeNhat.ngayTraLai).add(soKyDongLai,'days'))<moment(new Date())){
                    let r1 = colHD.updateOne({_id:idHD},{
                        $set:{
                            trangThaiHopDong:1
                        }
                    });
                }else {

                    let r1 = colHD.updateOne({_id:idHD},{
                        $set:{
                            trangThaiHopDong:0
                        }
                    });
                }
            }
        } else if (cachTinhLai === 1) {      //cachTinhLai: thang
            if (kieuDongLai === 0) {            //Trả sau
                if((moment(resCTHDBeNhat.ngayTraLai))<moment(new Date())){
                    let r1 = colHD.updateOne({_id:idHD},{
                        $set:{
                            trangThaiHopDong:1
                        }
                    });
                }else {
                    let r1 = colHD.updateOne({_id:idHD},{
                        $set:{
                            trangThaiHopDong:0
                        }
                    });
                }
            } else if (kieuDongLai === 1) {            //Trả trước
                if((moment(resCTHDBeNhat.ngayTraLai).add(soKyDongLai,'months'))<moment(new Date())){
                    let r1 = colHD.updateOne({_id:idHD},{
                        $set:{
                            trangThaiHopDong:1
                        }
                    });
                }else {
                    let r1 = colHD.updateOne({_id:idHD},{
                        $set:{
                            trangThaiHopDong:0
                        }
                    });
                }
            }
        }
        client.close();
    }

}
