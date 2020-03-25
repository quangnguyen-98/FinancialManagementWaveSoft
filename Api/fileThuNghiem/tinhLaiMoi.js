//cachTinhLai: 0=ngay, 1=thang
function tinhLai(ngayVay, tongTienVay, soKyDongLai, cachTinhLai, giaTriLaiXuat, soLanTra, kieuDongLai) {
    if (cachTinhLai == 0) {       //cachTinhLai: ngay
        let mucLaiNgay = (tongTienVay/1000000)*giaTriLaiXuat;
        //kieuDongLai: 0= Trả sau, 1 = Trả trước
        if(kieuDongLai == 0){            //Trả sau
            var arLichTraNo = [];
            var ngay = new Date(ngayVay.nam,ngayVay.thang,ngayVay.ngay);
            console.log(ngay);
            ngay.setDate(ngay.getDate()-1);
            console.log(ngay);
            for(let i=0; i<soLanTra;i++){
                ngay.setDate(ngay.getDate()+parseInt(soKyDongLai));
                let row = {
                    thoiGian:{
                        ngay:ngay.getDate(),
                        thang:ngay.getMonth(),
                        nam:ngay.getFullYear()
                    },
                    lai:mucLaiNgay
                };
                arLichTraNo.push(row);
            }
            console.log(arLichTraNo);

        }
        else if (kieuDongLai === 1){       //Trả trước
            var arLichTraNo = [];
            var ngay = new Date(ngayVay.nam,ngayVay.thang,ngayVay.ngay);
            var ngayMoi = ngay;
            console.log(ngay);
            for(let i=0; i<soLanTra-1;i++){
                if(i == 0){
                    ngay.setDate(ngay.getDate());
                    let row = {
                        thoiGian:{
                            ngay:ngay.getDate(),
                            thang:ngay.getMonth(),
                            nam:ngay.getFullYear()
                        },
                        lai:mucLaiNgay
                    };
                    arLichTraNo.push(row);
                }
                ngay.setDate(ngay.getDate()+parseInt(soKyDongLai));
                let row = {
                    thoiGian:{
                        ngay:ngay.getDate(),
                        thang:ngay.getMonth(),
                        nam:ngay.getFullYear()
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
            var ngay = new Date(ngayVay.nam, ngayVay.thang, ngayVay.ngay);
            // ngay.setDate(ngay.getDate() - 1);
            console.log(ngay);
            for (let i = 0; i < soLanTra ; i++) {
                ngay.setMonth(ngay.getMonth() + parseInt(soKyDongLai));
                let row = {
                    thoiGian: {
                        ngay: ngay.getDate(),
                        thang: ngay.getMonth(),
                        nam: ngay.getFullYear()
                    },
                    lai: mucLaiThang
                };
                arLichTraNo.push(row);
            }
            console.log(arLichTraNo);
        }
        else if(kieuDongLai === 1){            //Trả trước
            var arLichTraNo = [];
            var ngay = new Date(ngayVay.nam,ngayVay.thang,ngayVay.ngay);
            // ngay.setMonth(ngay.getMonth() - 1);
            console.log(ngay);
            for(let i=0; i<soLanTra;i++){
                if(i==0){
                    // ngay.setMonth(ngay.getMonth()+parseInt(soKyDongLai));
                    let row = {
                        thoiGian:{
                            ngay:ngay.getDate(),
                            thang:ngay.getMonth(),
                            nam:ngay.getFullYear()
                        },
                        lai:mucLaiThang
                    };
                    arLichTraNo.push(row);
                }else if(i!=0){
                    ngay.setMonth(ngay.getMonth()+parseInt(soKyDongLai));
                    let row = {
                        thoiGian:{
                            ngay:ngay.getDate(),
                            thang:ngay.getMonth(),
                            nam:ngay.getFullYear()
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
// var ngayvay = {
//     ngay:28,
//     thang:4, //tháng 0-11
//     nam:2017
// }
//  tinhLai(ngayvay,10000000,1,1,10,3,0);

const a =new Date(1998,1,4);
console.log(a);
console.log(a.getDate());
console.log(a.getMonth());
console.log(a.getFullYear());