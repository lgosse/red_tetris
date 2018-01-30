import reducers from "./reducers";
import debug from "debug";
const loginfo = debug("tetris:ioReducer");

const ioReducer = (io, socket, action) => {
  loginfo(`Action type: ${action.type}`);
  Object.keys(reducers).map(reducerKey => {
    reducers[reducerKey](action, io, socket);
  });
};

export default ioReducer;
