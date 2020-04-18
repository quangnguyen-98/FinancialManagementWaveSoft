import {combineReducers} from "redux";
import switchScreenReducers from "./switchScreenReducers";
import chuChoVayDuocChonReducers from "./admin/chuChoVayDuocChonReducers";
import nhanVienDuocChonReducers from "./managers/nhanVienDuocChonReducers";
import diaglogKhoaUserReducers from "./diaglogKhoaUserReducers";
import refreshReducers from "./refreshReducers";
import hopDongDuocChonReducers from "./hopDongDuocChonReducers";
import tenKHDuocChonReducers from "./tenKHDuocChonReducers";
import openModalReducers from "./openModalReducers";
import loaiHDDangChonReducers from "./loaiHDDangChonReducers";

const allReducers = combineReducers({
    switchScreenReducers,
    chuChoVayDuocChonReducers,
    diaglogKhoaUserReducers,
    nhanVienDuocChonReducers,
    refreshReducers,
    hopDongDuocChonReducers,
    tenKHDuocChonReducers,
    openModalReducers,
    loaiHDDangChonReducers
});

export default allReducers;