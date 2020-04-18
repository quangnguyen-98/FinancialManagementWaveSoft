// Lưu lại loại hợp đồng đang chọn (vd: dangvay, choduyet,dadong)

const defaultState = false;
const loaiHDDangChonReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_LOAIHD_DANGCHON': {
            return  action.loaiHD;
        }
        default:
            return state
    }
}

export default loaiHDDangChonReducers;