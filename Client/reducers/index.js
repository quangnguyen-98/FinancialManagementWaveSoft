import {combineReducers} from "redux";
import switchScreenReducers from "./switchScreenReducers";

const allReducers =combineReducers({
   switchScreenReducers,
});

export default  allReducers;