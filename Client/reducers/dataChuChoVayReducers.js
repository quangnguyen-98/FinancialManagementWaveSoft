import {AsyncStorage} from "react-native";
import {apiLink} from "../config/constant";

const defaultState = {
    data: [],
    page: 0
}
const dataChuChoVayReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE': {
            return {
                data: [...state.data, ...action.newData],
                page: action.page
            }
        }
        case 'REFRESH':{
            return {
                data:action.newData,
                page: 0
            }
        }
        case 'GOBACK':{
            let newState= state;
            return newState;
        }
        default:
            return state
    }
}

async function getDataChuChoVay(page) {
    try {
        let value = await AsyncStorage.getItem('token');
        let response = await fetch(apiLink + 'admin/managers/' + page + '?token=' + value);
        let responseJson = await response.json();
        return responseJson;
    } catch (e) {
        console.log(e);
    }

}
export default dataChuChoVayReducers;