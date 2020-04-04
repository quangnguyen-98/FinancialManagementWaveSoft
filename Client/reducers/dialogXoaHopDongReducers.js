const defaultState = false;
const diaglogXoaHopDongReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'DELETE': {
            return true;
        }
        default:
            return state
    }
}

export default diaglogXoaHopDongReducers;