const express = require('express');
const router = express.Router();

const authController =require('../controllers/auth.Controller');
const adminController = require('../controllers/admin.Controller');
const managersController = require('../controllers/managers.Controller');
const usersController = require('../controllers/users.Controller');
const usersValidate = require('../validator/users.Validate');

//Endpoint:localhost:3000/api/v1/admin/

/*Chức năng quản lý thông tin------------------------------------------------*/

// // Sửa thông tin bản thân
// router.put('/',authController.KiemTraTokenAdmin,usersValidate.Validate_User_KhiSuaBanThan,usersController.CapNhatBanThanUser );
//
// //Đổi mật khẩu
// router.put('/doimk', authController.KiemTraTokenAdmin,usersValidate.Validate_MatKhau_User,usersController.DoiMatKhau);

/*Chức năng CRUD quản lý------------------------------------------------*/

// Lấy danh sách các quản lý
router.get('/managers/:page',authController.KiemTraTokenAdmin,managersController.LayTatCaManager );

// Tạo mới quản lý
router.post('/managers', authController.KiemTraTokenAdmin,usersValidate.Validate_User_KhiThem,usersController.KiemTraUserTonTai_KhiThem,managersController.ThemManager);

// Cập nhật quản lý
router.put('/managers', authController.KiemTraTokenAdmin,usersValidate.Validate_User_KhiSua,managersController.CapNhatManager);

// Khóa quản lý
router.put('/lockmanagers', authController.KiemTraTokenAdmin,usersValidate.Validate_User_KhiXoa,usersController.KiemTraUserTonTai_KhiXoa,managersController.KhoaManager);

// Mở khóa quản lý
router.put('/unlockmanagers', authController.KiemTraTokenAdmin,usersValidate.Validate_User_KhiXoa,usersController.KiemTraUserTonTai_KhiXoa,managersController.MoKhoaManager);

// Xóa quản lý
router.delete('/managers', authController.KiemTraTokenAdmin,usersValidate.Validate_User_KhiXoa,usersController.KiemTraUserTonTai_KhiXoa,managersController.XoaManager);




module.exports = router;
