const express = require('express');
const router = express.Router();

const authContronller = require('../controllers/auth.Controller');

//Endpoint:localhost:3000/api/v1/auth/

router.post('/', authContronller.KiemTraDangNhap);

router.get('/checklogined', authContronller.CheckLogined);

router.get('/checkpasstruockhixoa', authContronller.KiemTraPassTruocKhiXoa);







module.exports = router;
