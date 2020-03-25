const express = require('express');
const router = express.Router();

const authContronller = require('../controllers/auth.Controller');

//Endpoint:localhost:3000/api/v1/auth/

router.post('/', authContronller.KiemTraDangNhap);

router.get('/checklogined', authContronller.CheckLogined);







module.exports = router;
