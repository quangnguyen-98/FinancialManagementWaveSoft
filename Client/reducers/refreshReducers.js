// Phục vụ cho việc reload lại các screen

const defaultState = false;
const refreshReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'REFRESH': {
            return  Math.random() * 1000;
        }
        case 'RESET_REFRESH': {
            return  false;
        }
        default:
            return state
    }
}

export default refreshReducers;