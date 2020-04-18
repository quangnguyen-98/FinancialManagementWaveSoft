const moment = require('moment');
//cachTinhLai: 0=ngay, 1=thang
function tinhLai(ngayVay, tongTienVay, soKyDongLai, cachTinhLai, giaTriLaiXuat, soLanTra, kieuDongLai) {
    if (cachTinhLai == 0) {       //cachTinhLai: ngay
        let mucLaiNgay = (tongTienVay/1000000)*giaTriLaiXuat;
        //kieuDongLai: 0= Trả sau, 1 = Trả trước
        if(kieuDongLai == 0){            //Trả sau
            var arLichTraNo = [];
            ngayVay.setDate(ngayVay.getDate()-1);
            console.log(ngayVay);
            for(let i=0; i<soLanTra;i++){
                ngayVay = moment(ngayVay).add(soKyDongLai , "days").toDate();
                let row = {
                    thoiGian:{
                        ngay:ngayVay.getDate(),
                        thang:ngayVay.getMonth(),
                        nam:ngayVay.getFullYear()
                    },
                    lai:mucLaiNgay
                };
                arLichTraNo.push(row);
            }
            console.log(arLichTraNo);

        }
        else if (kieuDongLai === 1){       //Trả trước
            var arLichTraNo = [];
            for(let i=0; i<soLanTra-1;i++){
                if(i == 0){
                    let row = {
                        thoiGian:{
                            ngay:ngayVay.getDate(),
                            thang:ngayVay.getMonth(),
                            nam:ngayVay.getFullYear()
                        },
                        lai:mucLaiNgay
                    };
                    arLichTraNo.push(row);
                }
                ngayVay = moment(ngayVay).add(soKyDongLai , "days").toDate();
                // ngayVay.setDate(ngayVay.getDate()+parseInt(soKyDongLai));
                let row = {
                    thoiGian:{
                        ngay:ngayVay.getDate(),
                        thang:ngayVay.getMonth(),
                        nam:ngayVay.getFullYear()
                    },
                    lai:mucLaiNgay
                };
                arLichTraNo.push(row);
            }
            console.log(arLichTraNo);
        }
    }
    else if(cachTinhLai == 1){      //cachTinhLai: thang
        let mucLaiThang = (tongTienVay / 100) * giaTriLaiXuat;
        //kieuDongLai: 0= Trả sau, 1 = Trả trước
        if (kieuDongLai === 0) {            //Trả sau
            var arLichTraNo = [];
            for (let i = 0; i < soLanTra ; i++) {
                ngayVay = moment(ngayVay).add(soKyDongLai , "months").toDate();
                // ngayVay.setMonth(ngayVay.getMonth() + parseInt(soKyDongLai));
                let row = {
                    thoiGian: {
                        ngay: ngayVay.getDate(),
                        thang: ngayVay.getMonth(),
                        nam: ngayVay.getFullYear()
                    },
                    lai: mucLaiThang
                };
                arLichTraNo.push(row);
            }
            console.log(arLichTraNo);
        }
        else if(kieuDongLai === 1){            //Trả trước
            var arLichTraNo = [];
            console.log(ngayVay);
            for(let i=0; i<soLanTra;i++){
                if(i === 0){
                    let row = {
                        thoiGian:{
                            ngay:ngayVay.getDate(),
                            thang:ngayVay.getMonth(),
                            nam:ngayVay.getFullYear()
                        },
                        lai:mucLaiThang
                    };
                    arLichTraNo.push(row);
                }else if(i !== 0){
                    ngayVay = moment(ngayVay).add(soKyDongLai , "months").toDate();
                    // ngayVay.setMonth(ngayVay.getMonth()+parseInt(soKyDongLai));
                    let row = {
                        thoiGian:{
                            ngay:ngayVay.getDate(),
                            thang:ngayVay.getMonth(),
                            nam:ngayVay.getFullYear()
                        },
                        lai:mucLaiThang
                    };
                    arLichTraNo.push(row);
                }
            }
            console.log(arLichTraNo);
        }
    }
}

function tinhNgayTraGoc(ngayVay, soKyDongLai, cachTinhLai,  soLanTra) {
    if (cachTinhLai == 0) {       //cachTinhLai: ngay

        var arLichTraNo = [];
        var ngay = new Date(ngayVay.nam,ngayVay.thang,ngayVay.ngay);
        ngay.setDate(ngay.getDate()-1);
        for(let i=0; i<soLanTra;i++){
            ngay.setDate(ngay.getDate()+parseInt(soKyDongLai));
            let row = {
                thoiGian:{
                    ngay:ngay.getDate(),
                    thang:ngay.getMonth(),
                    nam:ngay.getFullYear()
                },
            };
            arLichTraNo.push(row);
            if(i==soLanTra-1){
                console.log(row);
            }
        }
         // console.log(arLichTraNo);
    }
    else if(cachTinhLai == 1){      //cachTinhLai: thang

        var arLichTraNo = [];
        var ngay = new Date(ngayVay.nam, ngayVay.thang, ngayVay.ngay);
        // ngay.setDate(ngay.getDate() - 1);
        for (let i = 0; i < soLanTra ; i++) {
            ngay.setMonth(ngay.getMonth() + parseInt(soKyDongLai));
            let row = {
                thoiGian: {
                    ngay: ngay.getDate(),
                    thang: ngay.getMonth(),
                    nam: ngay.getFullYear()
                },
            };
            arLichTraNo.push(row);
            if(i==soLanTra-1){
                console.log(row);
            }
        }
        /* console.log(arLichTraNo);*/
    }
}
// tinhNgayTraGoc({ngay:28,thang:4,nam:2017},1,1,3);
//
// function addMonths(date, months) {
//     var d = date.getDate();
//     date.setMonth(date.getMonth() + +months);
//     if (date.getDate() != d) {
//         date.setDate(0);
//     }
//     return date;
// }
//
//
// console.log(new Date('2020-4-11'));
// console.log("date")
var ngayvay1 = new Date('2020-4-11');
var ngayvay = {
    ngay:11,
    thang:3, //tháng 0-11
    nam:2020
}
 tinhLai(ngayvay1,10000000,3,1,10000,5,0);

// const a =new Date(1998,1,4);
// console.log(a);
// console.log(a.getDate());
// console.log(a.getMonth());
// console.log(a.getFullYear());