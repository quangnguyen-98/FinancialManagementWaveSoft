import {combineReducers} from "redux";
import switchScreenReducers from "./switchScreenReducers";
import dataChuChoVayReducers from "./dataChuChoVayReducers";
const allReducers =combineReducers({
   switchScreenReducers,dataChuChoVayReducers
});

export default  allReducers;