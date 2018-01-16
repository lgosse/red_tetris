import reducers from "./reducers";
import debug from "debug";
const logerror = debug("tetris:error"),
  loginfo = debug("tetris:info");

export const merge = (store, reducerKey, state, newState) => {
  if (state[reducerKey] != newState) {
    store.setState({
      ...state,
      [reducerKey]: {
        ...newState
      }
    });
  }
};

const ioReducer = (io, socket, action, store) => {
  Object.keys(reducers).map(reducerKey => {
    const state = store.getState();
    loginfo(state);
    const newState = reducers[reducerKey](
      state[reducerKey],
      action,
      io,
      socket
    );
    merge(store, reducerKey, state, newState);
  });
};

export default ioReducer;
