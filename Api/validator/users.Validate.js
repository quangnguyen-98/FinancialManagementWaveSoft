module.exports = {
    Validate_User_KhiThem: function (req, res, next) {

        try {
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

            if(email == undefined || password == undefined || hoTen == undefined || gioiTinh == undefined || sdt == undefined){
                res.status(400).json({
                    status:'fail',
                    message:'Thông tin không được trống !'
                });
            }
            else if(email.length == 0 || password.length == 0 || hoTen.length == 0 || gioiTinh.length == 0 || sdt.length == 0){
                res.status(400).json({
                    status:'fail',
                    message:'Thông tin không được trống !'
                });
            }
            else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            {
                res.status(400).json({
                    status:'fail',
                    message:'Email không hợp lệ !'
                });
            }else {
                next();
            }

        }catch (err) {
            res.status(400).json({
                status: "fail",
                message: err.toString()
            });
        }
    },
    Validate_User_KhiSua: function (req, res, next) {
        try {
            let id = req.body.id;
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

            if(id == undefined || hoTen == undefined || gioiTinh == undefined || sdt == undefined ){
                res.status(400).json({
                    status:'fail',
                    message:'Thông tin không được trống !'
                });
            }
            else if(id.length != 24 || hoTen.length == 0 || gioiTinh.length == 0 || sdt.length == 0){
                res.status(400).json({
                    status:'fail',
                    message:'Thông tin không được trống !'
                });
            }else {
                next();
            }

        }catch (err) {
            res.status(400).json({
                status: "fail",
                message: err.toString()
            });
        }
    },
    Validate_User_KhiSuaBanThan: function (req, res, next) {
        try {
            let id = req.body.id;
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

            if( hoTen == undefined || gioiTinh == undefined || sdt == undefined ){
                res.status(400).json({
                    status:'fail',
                    message:'Thông tin không được trống !'
                });
            }
            else if( hoTen.length == 0 || gioiTinh.length == 0 || sdt.length == 0){
                res.status(400).json({
                    status:'fail',
                    message:'Thông tin không được trống !'
                });
            }else {
                next();
            }

        }catch (err) {
            res.status(400).json({
                status: "fail",
                message: err.toString()
            });
        }
    },
    Validate_User_KhiXoa: function (req, res, next) {
        try {
            let id = req.body.id;
            if(id == undefined ){
                res.status(400).json({
                    status:'fail',
                    message:'Id không được trống !'
                });
            }
            else if(id.length != 24  ){
                res.status(400).json({
                    status:'fail',
                    message:'Id không hợp lệ !'
                });
            }else {
                next();
            }

        }catch (err) {
            res.status(400).json({
                status: "fail",
                message: err.toString()
            });
        }
    },
    Validate_MatKhau_User: function (req, res, next) {
        try {
            let pass = req.body.password;
            if(pass == undefined ){
                res.status(400).json({
                    status:'fail',
                    message:'Mật khẩu không được trống !'
                });
            }
            else if(pass.length == 0  ){
                res.status(400).json({
                    status:'fail',
                    message:'Mật khẩu không hợp lệ !'
                });
            }else {
                next();
            }

        }catch (err) {
            res.status(400).json({
                status: "fail",
                message: err.toString()
            });
        }
    }
}