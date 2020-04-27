const express = require('express');
const router = express.Router();

const authController =require('../controllers/auth.Controller');
const managersController = require('../controllers/managers.Controller');
const usersController = require('../controllers/users.Controller');
const usersValidate = require('../validator/users.Validate');
const hopdongsValidate = require('../validator/hopDongs.Validate');
const hopdongsController = require('../controllers/hopDongs.Controller');
const chitiethopdongsController = require('../controllers/chiTietHopDongs.Controller');
const lichSuController = require('../controllers/lichSuController');
//Endpoint:localhost:3000/api/v1/managers/

/*Chức năng CRUD nhân viên------------------------------------------------*/

// Lấy danh sách các nhân viên của chủ cho vay
router.get('/users/:page',authController.KiemTraTokenManager,usersController.LayUserTheoTrang);

// Lấy nhân viên của chủ cho vay theo id
router.get('/users',authController.KiemTraTokenManager,usersController.LayUserTheoId);

// Tìm kiếm nhân viên của chủ cho vay
router.get('/timusers',authController.KiemTraTokenManager,usersController.TimKiemUser);

// Tạo mới nhân viên
router.post('/users', authController.KiemTraTokenManager,usersValidate.Validate_User_KhiThem,usersController.KiemTraUserTonTai_KhiThem,usersController.ThemUser);

// // Cập nhật nhân viên     -bỏ, quản lý ko đc cập nhật nhân viên
// router.put('/users', authController.KiemTraTokenManager,usersValidate.Validate_User_KhiSua,usersController.CapNhatUser);

// Khóa nhân viên
router.put('/lockusers', authController.KiemTraTokenManager,usersValidate.Validate_User_KhiXoa,usersController.KiemTraUserTonTai_KhiXoa,usersController.KhoaUser);

// Mở khóa nhân viên
router.put('/unlockusers', authController.KiemTraTokenManager,usersValidate.Validate_User_KhiXoa,usersController.KiemTraUserTonTai_KhiXoa,usersController.MoKhoaUser);

// Xóa nhân viên
router.delete('/users', authController.KiemTraTokenManager,usersValidate.Validate_User_KhiXoa,usersController.KiemTraUserTonTai_KhiXoa,usersController.XoaUser);


/*Chức năng quản lý hợp đồng------------------------------------------------*/

//Lấy danh sách hợp đồng của chủ cho vay theo trang
 router.get('/hopdongs/:type/:page',authController.KiemTraTokenManager,hopdongsController.LayTatCaHopDongTheoTrang);

//Lấy thông tin người tạo hợp đồng
router.get('/nguoitaohopdongs',authController.KiemTraTokenManager,hopdongsController.LayThongTinNguoiTaoHopDongByIDHD);

// Tìm kiếm hợp đồng của chủ cho vay
router.get('/timhopdongs/:type',authController.KiemTraTokenManager,hopdongsController.TimKiemHopDong);

//Thêm hợp đồng bởi chủ cho vay
router.post('/hopdongs',authController.KiemTraTokenManager,hopdongsValidate.Validate_HopDong_KhiThem,hopdongsController.ThemHopDong );

//Sửa hợp đồng bởi chủ cho vay
router.put('/hopdongs',authController.KiemTraTokenManager,hopdongsController.SuaHopDong);

//Xóa hợp đồng bởi chủ cho vay
router.put('/xoahopdongs',authController.KiemTraTokenManager,hopdongsController.XoaHopDong);

//Duyệt hợp đồng của nhân viên
router.put('/duyethopdongs',authController.KiemTraTokenManager,hopdongsController.DuyetHopDong);

//Tất toán hợp đồng bởi chủ cho vay
router.put('/tattoanhopdongs',authController.KiemTraTokenManager,chitiethopdongsController.TatToanHopDong);

//Tất toán hợp đồng bởi chủ cho vay
router.put('/tinhtientattoan',authController.KiemTraTokenManager,chitiethopdongsController.TinhTienTatToan);

//Đóng lãi hợp đồng bởi chủ cho vay
router.put('/donglai',authController.KiemTraTokenManager,chitiethopdongsController.DongLaiHopDong);

//Xóa phiếu thu (hủy đóng lãi) hợp đồng bởi chủ cho vay
router.put('/xoaphieuthu',authController.KiemTraTokenManager,chitiethopdongsController.XoaPhieuThu);

//Gia hạn kỳ hợp đồng bởi chủ cho vay
router.put('/giahanhopdongs',authController.KiemTraTokenManager,hopdongsValidate.Validate_HopDong_Khi_GiaHan,chitiethopdongsController.GiaHanHopDong);

//Trả bớt gốc hợp đồng bởi chủ cho vay
//router.put('/trabotgochopdongs',authController.KiemTraTokenManager,hopdongsController.Manager_TraBotGocHopDong);

//Vay thêm hợp đồng bởi chủ cho vay
router.put('/vaythemhopdongs',authController.KiemTraTokenManager,hopdongsValidate.Validate_HopDong_Khi_VayThem,chitiethopdongsController.VayThemHopDong);

router.put('/trabotgochopdongs',authController.KiemTraTokenManager,hopdongsValidate.Validate_HopDong_Khi_TraBotGoc,chitiethopdongsController.TraBotGocHopDong);

//Lấy hợp đồng theo id
router.get('/hopdongs',authController.KiemTraTokenManager,hopdongsController.Manager_LayHopDongTheoId);

//Thêm chi tiết hợp đồng
//router.post('/chitiethopdongs',authController.KiemTraTokenManager,chitiethopdongsController.Manager_ThemChiTietHopDong);

//Lấy danh sách chi tiết hợp đồng theo id hợp đồng (lấy danh sách các cột lãi)
router.get('/chitiethopdongs',authController.KiemTraTokenManager,chitiethopdongsController.LayDanhSachCTHD_TheoIdHD);

//Lấy 1 chi tiết hợp đồng theo id hợp đồng
router.get('/chitiethopdongs/:id',authController.KiemTraTokenManager,chitiethopdongsController.LayCTHD_TheoId);

/*Chức năng quản lý  lịch sử hợp đồng------------------------------------------------*/

//Lấy danh sách lịch sử của chủ cho vay theo trang
router.get('/lichsus/:page',authController.KiemTraTokenManager,lichSuController.LayTatCaLichSu);





module.exports = router;
