const jwt = require('jsonwebtoken');
const { DbUrl, DbName, soItemMoiPage } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
module.exports = {
    LayTatCaLichSu: async function (req, res, next) {

        const client = new MongoClient(DbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
        try {
            const page = req.params.page;
            const idHopDong = ObjectId(req.query.idHopDong);
            await client.connect();
            const db = client.db(DbName);
            const colLS = db.collection('LichSu');
            let resultLS = await colLS.find({
                idHopDong: idHopDong
            }).sort({_id: -1}).limit(soItemMoiPage).skip(soItemMoiPage * page).toArray();
            res.status(200).json(resultLS);
        } catch (err) {
            console.log(err);
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }

    }
}

