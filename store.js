import { createStore, logger } from "./libs/react-redux/index.js";
import reducer from "./reducer.js";

const {attach, connect, dispatch} = createStore(logger(reducer));

// make dispatch as global to use in components
window.dispatch = dispatch;

export {attach, connect};