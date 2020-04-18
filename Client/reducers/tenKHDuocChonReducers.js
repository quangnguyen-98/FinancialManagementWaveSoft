// Lưu tên khách hàng từ màn hình chi tiết hợp đồng để hiển thị lên màn hình tất toán

const defaultState = ''
const tenKHDuocChonReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_THONGTIN_KH': {
            return action.ten;
        }
        default:
            return state
    }
}

export default tenKHDuocChonReducers;