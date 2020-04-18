// Lưu lại id hợp đồng đang được chọn

const defaultState = ''
const hopDongDuocChonReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'SETTHONGTINHOPDONG': {
            return action.id;
        }
        default:
            return state
    }
}

export default hopDongDuocChonReducers;