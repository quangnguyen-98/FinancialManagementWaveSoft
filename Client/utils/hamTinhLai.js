
async function tinhTongTienTatToan(soLanThem, ngayTraLaiCuoiCung,tongTienVay, soKyDongLai, cachTinhLai, giaTriLaiSuat, kieuDongLai, idHD,soLanTra) {
    let idHopDong = ObjectId(idHD);
    const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    await client.connect();
    const db = client.db(DbName);
    const colHD = db.collection('HopDong');
    const colCTHD = db.collection('ChiTietHopDong');
    let arrKyDongLai = [];
    if(cachTinhLai === 0){                         //Tính lãi ngày
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
            let r2 = await colCTHD.deleteOne({type:3,idHopDong:idHopDong});
            let r3 = await colCTHD.insertOne({
                ngayTraLai: ngayTraLaiCuoiCung,
                tienLai: 0,
                tienGoc: parseInt(tongTienVay),
                phieuThu: {},
                type: 3,
                idHopDong: idHopDong
            });
        }else if(kieuDongLai === 1){                //Trả trước
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
            let r2 = await colCTHD.deleteOne({type:3,idHopDong:idHopDong});
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
    else if(cachTinhLai === 1){                      //Tính lãi theo tháng
        let mucLaiThang = (tongTienVay / 100) * giaTriLaiSuat;
        if (kieuDongLai === 0) {                     //Trả sau
            for (let i = 0; i < soLanThem; i++) {
                ngayTraLaiCuoiCung = moment(ngayTraLaiCuoiCung).add(soKyDongLai, "months").toDate();
                let kyDongLai = {
                    ngayTraLai: ngayTraLaiCuoiCung,
                    tienLai: mucLaiThang,
                    tienGoc: 0,
                    phieuThu: {},
                    type: 0,
                    idHopDong: idHopDong
                }
                arrKyDongLai.push(kyDongLai)
            }
            let r = await colCTHD.insertMany(arrKyDongLai);
            let r2 = await colCTHD.deleteOne({type:3,idHopDong:idHopDong});
            let r3 = await colCTHD.insertOne({
                ngayTraLai: ngayTraLaiCuoiCung,
                tienLai: 0,
                tienGoc: parseInt(tongTienVay),
                phieuThu: {},
                type: 3,
                idHopDong: idHopDong
            });
        }else if(kieuDongLai === 1){                   //Trả trước
            for (let i = 0; i < soLanThem; i++) {
                ngayTraLaiCuoiCung = moment(ngayTraLaiCuoiCung).add(soKyDongLai, "months").toDate();
                let kyDongLai = {
                    ngayTraLai: ngayTraLaiCuoiCung,
                    tienLai: mucLaiThang,
                    tienGoc: 0,
                    phieuThu: {},
                    type: 0,
                    idHopDong: idHopDong
                }
                arrKyDongLai.push(kyDongLai)
            }
            ngayTraLaiCuoiCung = moment(ngayTraLaiCuoiCung).add(soKyDongLai, "months").toDate();
            let r = await colCTHD.insertMany(arrKyDongLai);
            let r2 = await colCTHD.deleteOne({type:3,idHopDong:idHopDong});
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
    let r4 = await colHD.updateOne({_id:idHopDong},
        {
            $set:{
                'thongTinHopDong.soLanTra':soLanTra+soLanThem,
                'thongTinHopDong.ngayTraGoc':ngayTraLaiCuoiCung
            }
        });

}

export {tinhTongTienTatToan}