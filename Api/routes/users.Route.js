const express = require('express');
const router = express.Router();

const authController =require('../controllers/auth.Controller');
const usersController = require('../controllers/users.Controller');
const usersValidate = require('../validator/users.Validate');
const hopdongsController = require('../controllers/hopDongs.Controller');
const quenMatKhauController = require('../controllers/quenMatKhau.Controller');
const chitiethopdongsController = require('../controllers/chiTietHopDongs.Controller');
const hopdongsValidate = require('../validator/hopDongs.Validate');
const lichSuController = require('../controllers/lichSuController');

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

/*Chức năng gửi mail khách hàng------------------------------------------------*/
router.post('/guimailkh',usersController.GuiMailKhachHang);



/*CHỨC NĂNG CỦA NHÂN VIÊN------------------------------------------------*/

/*Chức năng quản lý hợp đồng------------------------------------------------*/

//Lấy danh sách hợp đồng của chủ cho vay theo trang
router.get('/hopdongs/:type/:page',authController.KiemTraTokenUser,hopdongsController.LayTatCaHopDongTheoTrang);

//Lấy thông tin người tạo hợp đồng
router.get('/nguoitaohopdongs',authController.KiemTraTokenUser,hopdongsController.LayThongTinNguoiTaoHopDongByIDHD);

// Tìm kiếm hợp đồng của nhân viên
router.get('/timhopdongs/:type',authController.KiemTraTokenUser,hopdongsController.TimKiemHopDong);

//Thêm hợp đồng bởi nhân viên
router.post('/hopdongs',authController.KiemTraTokenUser,hopdongsValidate.Validate_HopDong_KhiThem,hopdongsController.ThemHopDong );

//Sửa hợp đồng bởinhân viênnhân viênput('/hopdongs',authController.KiemTraTokenManager,hopdongsController.SuaHopDong);

//Xóa hợp đồng bởi nhân viên
router.put('/xoahopdongs',authController.KiemTraTokenUser,hopdongsController.XoaHopDong);

//Tất toán hợp đồng bởi nhân viên
router.put('/tattoanhopdongs',authController.KiemTraTokenUser,chitiethopdongsController.TatToanHopDong);

//Đóng lãi hợp đồng bởi nhân viên
router.put('/donglai',authController.KiemTraTokenUser,chitiethopdongsController.DongLaiHopDong);

//Xóa phiếu thu (hủy đóng lãi) hợp đồng bởi nhân viên
router.put('/xoaphieuthu',authController.KiemTraTokenUser,chitiethopdongsController.XoaPhieuThu);

//Gia hạn kỳ hợp đồng bởi nhân viên
router.put('/giahanhopdongs',authController.KiemTraTokenUser,hopdongsValidate.Validate_HopDong_Khi_GiaHan,chitiethopdongsController.GiaHanHopDong);

//Trả bớt gốc hợp đồng bởi nhân viên
//router.put('/trabotgochopdongs',authController.KiemTraTokenManager,hopdongsController.Manager_TraBotGocHopDong);

//Vay thêm hợp đồng bởi nhân viên
router.put('/vaythemhopdongs',authController.KiemTraTokenUser,hopdongsValidate.Validate_HopDong_Khi_VayThem,chitiethopdongsController.VayThemHopDong);

//Lấy hợp đồng theo id
router.get('/hopdongs',authController.KiemTraTokenUser,hopdongsController.Manager_LayHopDongTheoId);

//Thêm chi tiết hợp đồng
//router.post('/chitiethopdongs',authController.KiemTraTokenUser,chitiethopdongsController.Manager_ThemChiTietHopDong);

//Lấy danh sách chi tiết hợp đồng theo id hợp đồng (lấy danh sách các cột lãi)
router.get('/chitiethopdongs',authController.KiemTraTokenUser,chitiethopdongsController.LayDanhSachCTHD_TheoIdHD);

//Lấy 1 chi tiết hợp đồng theo id hợp đồng
router.get('/chitiethopdongs/:id',authController.KiemTraTokenUser,chitiethopdongsController.LayCTHD_TheoId);

/*Chức năng quản lý  lịch sử hợp đồng------------------------------------------------*/

//Lấy danh sách lịch sử của nhân viên theo trang
router.get('/lichsus/:page',authController.KiemTraTokenUser,lichSuController.LayTatCaLichSu);

module.exports = router;
