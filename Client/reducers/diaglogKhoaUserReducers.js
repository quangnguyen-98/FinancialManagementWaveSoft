const defaultState = false;
const diaglogKhoaUserReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'OPEN_DIALOG': {
            return true;
        }
        case 'CLOSE_DIALOG': {
            return false;
        }
        default:
            return state
    }
}

export default diaglogKhoaUserReducers;