const express = require('express');
const router = express.Router();

const authController =require('../controllers/auth.Controller');
const usersController = require('../controllers/users.Controller');
const usersValidate = require('../validator/users.Validate');
const hopdongsController = require('../controllers/hopDongs.Controller');

//Endpoint:localhost:3000/api/v1/users/

/*Chức năng chỉnh sửa thông tin------------------------------------------------*/

// Cập nhật bản thân
router.put('/', authController.KiemTraTokenUser,usersValidate.Validate_User_KhiSuaBanThan,usersController.CapNhatBanThanUser);

//Đổi mật khẩu
router.put('/doimk', authController.KiemTraTokenUser,usersValidate.Validate_MatKhau_User,usersController.DoiMatKhau);

/*Chức năng quản lý hợp đồng------------------------------------------------*/

//Lấy danh sách hợp đồng của nhân viên
router.get('/hopdongs',authController.KiemTraTokenUser,hopdongsController.User_LayTatCaHopDong );

//Thêm hợp đồng mới
router.post('/hopdongs',authController.KiemTraTokenUser,hopdongsController.User_ThemHopDong );

module.exports = router;
