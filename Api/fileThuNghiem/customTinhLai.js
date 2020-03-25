//cachTinhLai: 0=ngay, 1=thang
function tinhLai(ngayVay, tongTienVay, soKyDongLai, cachTinhLai, loaiLaiSuat, giaTriLaiXuat, soLanTra, kieuDongLai) {
    if (cachTinhLai == 0) {       //cachTinhLai: ngay
        //loaiLaiSuat: 0 = Lãi/triệu/ngày, 1 = Lãi/ngày
        if(loaiLaiSuat == 0){
            let mucLaiNgay = (tongTienVay/1000000)*giaTriLaiXuat;
            //kieuDongLai: 0= Trả sau, 1 = Trả trước
            if(kieuDongLai == 0){            //Trả sau
                var arLichTraNo = [];
                var ngay = new Date(ngayVay.nam,ngayVay.thang,ngayVay.ngay);
                ngay.setDate(ngay.getDate()-1);
                console.log(ngay);
                for(let i=0; i<soLanTra-1;i++){
                    ngay.setDate(ngay.getDate()+parseInt(soKyDongLai));
                    let row = {
                        thoiGian:{
                            ngay:ngay.getDate(),
                            thang:ngay.getMonth()+1,
                            nam:ngay.getFullYear()
                        },
                        lai:mucLaiNgay
                    };
                    arLichTraNo.push(row);
                }
                console.log(arLichTraNo);

            }else if (kieuDongLai == 1){       //Trả trước
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
                              thang:ngay.getMonth()+1,
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
                            thang:ngay.getMonth()+1,
                            nam:ngay.getFullYear()
                        },
                        lai:mucLaiNgay
                    };
                    arLichTraNo.push(row);
                }
                console.log(arLichTraNo);
            }
        }
        else if (loaiLaiSuat==1){
            let mucLaiNgay = giaTriLaiXuat;
            //kieuDongLai: 0= Trả sau, 1 = Trả trước
            if(kieuDongLai == 0){            //Trả sau
                var arLichTraNo = [];
                var ngay = new Date(ngayVay.nam,ngayVay.thang,ngayVay.ngay);
                ngay.setDate(ngay.getDate()-1);
                console.log(ngay);
                for(let i=0; i<soLanTra-1;i++){
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

            }else if (kieuDongLai == 1){       //Trả trước
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
    }
    else if(cachTinhLai == 1){      //cachTinhLai: thang
        ////loaiLaiSuat: 0 = Lãi % tháng
        if(loaiLaiSuat == 0) {
            let mucLaiThang = (tongTienVay / 100) * giaTriLaiXuat;
            //kieuDongLai: 0= Trả sau, 1 = Trả trước
            if (kieuDongLai == 0) {            //Trả sau
                var arLichTraNo = [];
                var ngay = new Date(ngayVay.nam, ngayVay.thang, ngayVay.ngay);
                // ngay.setDate(ngay.getDate() - 1);
                console.log(ngay);
                for (let i = 0; i < soLanTra - 1; i++) {
                    ngay.setMonth(ngay.getMonth() + parseInt(soKyDongLai));
                    let row = {
                        thoiGian: {
                            ngay: ngay.getDate(),
                            thang: ngay.getMonth()+1,
                            nam: ngay.getFullYear()
                        },
                        lai: mucLaiThang
                    };
                    arLichTraNo.push(row);
                }
                console.log(arLichTraNo);
            }else if(kieuDongLai == 1){            //Trả trước
                var arLichTraNo = [];
                var ngay = new Date(ngayVay.nam,ngayVay.thang,ngayVay.ngay);
                ngay.setMonth(ngay.getMonth() - 1);
                console.log(ngay);
                for(let i=0; i<soLanTra-1;i++){
                    ngay.setMonth(ngay.getMonth()+parseInt(soKyDongLai));
                    let row = {
                        thoiGian:{
                            ngay:ngay.getDate(),
                            thang:ngay.getMonth()+1,
                            nam:ngay.getFullYear()
                        },
                        lai:mucLaiThang
                    };
                    arLichTraNo.push(row);
                }
                console.log(arLichTraNo);
            }
        }
    }
}

function addMonths(date, months) {
    var d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
        date.setDate(0);
    }
    return date;
}


var ngayvay = {
    ngay:28,
    thang:4, //tháng 0-11
    nam:2017
}
//tinhLai(ngayvay,10000000,1,1,0,51,5,0);

let a = new Date('2020-03-22T09:07:29.219+00:00');
console.log(a.getDate()+'/'+a.getMonth()+'/'+a.getFullYear());
console.log(new Date("2015-02-02").toISOString());