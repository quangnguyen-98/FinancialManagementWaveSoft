module.exports = {
    Validate_HopDong_KhiThem: function (req, res, next) {
        let hoTen = req.body.tenKhachHang;
        let sdt = req.body.sdt;
        let tongTienVay = req.body.thongTinHopDong.tongTienVay;
        let soKyDongLai = req.body.thongTinHopDong.soKyDongLai;
        let giaTriLaiSuat = req.body.thongTinHopDong.giaTriLaiSuat;
        let soLanTra = req.body.thongTinHopDong.soLanTra;

        if (hoTen === undefined || sdt === undefined || tongTienVay === undefined || soKyDongLai === undefined || giaTriLaiSuat === undefined || soLanTra === undefined) {
            res.status(400).json({
                status: 'fail',
                message: 'Thông tin không được trống !'
            });
        }
        else if (hoTen === null || sdt === null || tongTienVay === null || soKyDongLai === null || giaTriLaiSuat === null || soLanTra === null) {
            res.status(400).json({
                status: 'fail',
                message: 'Thông tin không được trống !'
            });
        } else if (hoTen.length === 0 || sdt.length === 0 || tongTienVay.length === 0 || soKyDongLai.length === 0 || giaTriLaiSuat.length === 0 || soLanTra.length === 0) {
            res.status(400).json({
                status: 'fail',
                message: 'Thông tin không được trống !'
            });
        } else if(parseInt(tongTienVay)<1000000) {
            res.status(400).json({
                status: 'fail',
                message: 'Tổng tiền vay phải lớn hơn 1 triệu !'
            });
        }
        else if(parseInt(soKyDongLai)<1){
            res.status(400).json({
                status: 'fail',
                message: 'Số kỳ đóng lãi phải lớn hơn 0  !'
            });
        }
        else if(parseInt(giaTriLaiSuat)<1){
            res.status(400).json({
                status: 'fail',
                message: 'Giá trị lãi suất phải lớn hơn 0  !'
            });
        }
        else {
            next();
        }

    },
    Validate_HopDong_Khi_GiaHan:function (req,res,next) {
        let soLanThem = req.body.soLanThem;
        if(soLanThem === undefined || soLanThem === null || soLanThem.length === 0){
            res.status(400).json({
                status: 'fail',
                message: 'Vui lòng nhập số kỳ muốn thêm  !'
            });
        }else {
            next();
        }
    },
    Validate_HopDong_Khi_VayThem:function (req,res,next) {
        let {tienVayThem} = req.body.thongTinVayThem;
        if(tienVayThem === undefined || tienVayThem === null || tienVayThem.length === 0){
            res.status(400).json({
                status: 'fail',
                message: 'Vui lòng nhập số tiền vay thêm  !'
            });
        }
        else {
            next();
        }
    },
    Validate_HopDong_Khi_TraBotGoc:function (req,res,next) {
        let {tienTraBotGoc} = req.body.thongTinTraBotGoc;
        if(tienTraBotGoc === undefined || tienTraBotGoc === null || tienTraBotGoc.length === 0){
            res.status(400).json({
                status: 'fail',
                message: 'Vui lòng nhập số tiền trả bớt gốc !'
            });
        }
        else {
            next();
        }
    }
}