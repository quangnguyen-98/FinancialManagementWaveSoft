module.exports = {
    Validate_User: function (req, res, next) {
        let email = req.body.email;
        let password = req.body.password;
        let hoTen = req.body.hoTen;
        let gioiTinh = req.body.gioiTinh;
        let ngaySinh = {
            ngay: req.body.ngay,
            thang: req.body.thang,
            nam: req.body.nam
        };
        let diaChi = req.body.diaChi;
        let sdt = req.body.sdt;
        let hinhAnh = req.body.hinhAnh;

        if(email.length == 0 || password.length == 0 || hoTen.length == 0 || gioiTinh.length == 0 ){
            res.status(400).json({
                status:'fail',
                message:'Thông tin không được trống !'
            });
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            res.status(400).json({
                status:'fail',
                message:'Email không hợp lệ !'
            });
        }
        next();

    }
}