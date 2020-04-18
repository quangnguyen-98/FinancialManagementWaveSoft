// const paramObj = {
//     DbUrl:'mongodb://localhost:27017',
//     DbName:'FinancialManagement',
//     secretKey:'cjdhan43gg34a',
//     soItemMoiPage:6,
//     apiLink:'http://192.168.1.19:3000/api/v1/'
// };
//
// module.exports= paramObj;


const DbUrl = 'mongodb://localhost:27017';
//const DbUrl = 'mongodb+srv://bb4298:quangdeptrai01@cluster0-eossp.gcp.mongodb.net/test?retryWrites=true&w=majority';
const DbName = 'FinancialManagement';
const soItemMoiPage = 6;
const apiLink = 'http://localhost:3000/'
const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/768px-User_font_awesome.svg.png';

module.exports = {
    DbUrl,
    DbName,
    soItemMoiPage,
    apiLink,
    defaultImage
};