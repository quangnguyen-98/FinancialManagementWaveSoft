const express = require('express');
const router = express.Router();

const quenMatKhauController = require('../controllers/quenMatKhau.Controller');
const usersValidate = require('../validator/users.Validate');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('Wellcome to Wavesoft Api');
});

router.get('/resetpassword/:token',quenMatKhauController.HienThiTrangDoiMatKhau );

router.post('/resetpassword',usersValidate.Validate_MatKhau_User,quenMatKhauController.ResetMatKhau );


module.exports = router;
