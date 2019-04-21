import { combineReducers } from "redux";
import factoryStates from "./factoryStates";
import language from "./language";
import populations from "./populations";

export default combineReducers({language, populations, factoryStates});