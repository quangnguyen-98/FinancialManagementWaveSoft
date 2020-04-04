const defaultState = {
    id:''
}

const hopDongDuocChonReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'SETTHONGTINHOPDONG': {
            return {
                id:action.id,
            }
        }
        default:
            return state
    }
}

export default hopDongDuocChonReducers;