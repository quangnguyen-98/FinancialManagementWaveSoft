const express = require('express');
const router = express.Router();

const authController =require('../controllers/auth.Controller');
const usersController = require('../controllers/users.Controller');
const usersValidate = require('../validator/users.Validate');
const hopdongsController = require('../controllers/hopDongs.Controller');
const quenMatKhauController = require('../controllers/quenMatKhau.Controller');

//Endpoint:localhost:3000/api/v1/users/

/*CHỨC NĂNG CHUNG CỦA USER TRONG HỆ THÔNG------------------------------------------------*/
/*Chức năng quản lý thông tin------------------------------------------------*/

// Lấy thông tin bản thân
router.get('/',usersController.LayThongtinUser );

// Cập nhật bản thân
router.put('/', usersValidate.Validate_User_KhiSuaBanThan,usersController.CapNhatBanThanUser);

//Đổi mật khẩu
router.put('/doimk', usersValidate.Validate_MatKhau_User,usersController.DoiMatKhau);

//Quên mật khẩu
router.post('/quenmk', usersValidate.Validate_Email_QuenMatKhau_User,quenMatKhauController.GuiEmailKhiQuenMatKhau);


/*CHỨC NĂNG CỦA NHÂN VIÊN------------------------------------------------*/
/*Chức năng quản lý hợp đồng------------------------------------------------*/

//Lấy danh sách hợp đồng của nhân viên
router.get('/hopdongs',authController.KiemTraTokenUser,hopdongsController.User_LayTatCaHopDong );

//Thêm hợp đồng bởi nhân viên
router.post('/hopdongs',authController.KiemTraTokenUser,hopdongsController.User_ThemHopDong );

module.exports = router;
