const express = require('express');
const router = express.Router();

const authController =require('../controllers/auth.Controller');
const hopDongsController = require('../controllers/hopDongs.Controller');
/* GET home page. */
// router.get('/',authController.KiemTraTokenUser,hopDongsController.LayTatCaHopDong );
//
// router.get('/timkiem', function (req,res,next) {
//     res.json('ok');
// });

module.exports = router;
