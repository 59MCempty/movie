import {legacy_createStore as createStore} from "redux";
import rootReducer from "../redux/reducer.js";

const store = createStore(rootReducer)

export default store