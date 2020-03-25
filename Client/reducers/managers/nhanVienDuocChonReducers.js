const defaultState = {
    id:'',
    trangThaiKhoa:''
}
const nhanVienDuocChonReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'SETTHONGTINNHANVIEN': {
            return {
                id:action.id,
                trangThaiKhoa:action.trangThaiKhoa
            }
        }
        default:
            return state
    }
}

export default nhanVienDuocChonReducers;