const defaultState = {
    id:'',
    trangThaiKhoa:''
}
const chuChoVayDuocChonReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'SETTHONGTINCHUCHOVAY': {
            return {
                id:action.id,
                trangThaiKhoa:action.trangThaiKhoa
            }
        }
        default:
            return state
    }
}

export default chuChoVayDuocChonReducers;