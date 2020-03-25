import {combineReducers} from "redux";
import switchScreenReducers from "./switchScreenReducers";
import chuChoVayDuocChonReducers from "./admin/chuChoVayDuocChonReducers";
import nhanVienDuocChonReducers from "./managers/nhanVienDuocChonReducers";
import diaglogKhoaUserReducers from "./diaglogKhoaUserReducers";

const allReducers = combineReducers({
    switchScreenReducers,
    chuChoVayDuocChonReducers,
    diaglogKhoaUserReducers,
    nhanVienDuocChonReducers
});

export default allReducers;