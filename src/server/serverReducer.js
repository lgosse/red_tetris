import reducers from "./reducers";
import debug from "debug";
const logerror = debug("tetris:error"),
  loginfo = debug("tetris:info");

export const merge = (store, reducerKey, state, newState) => {
  if (state[reducerKey] != newState) {
    const reducerState =
      newState && newState.length !== undefined
        ? state ? [...newState] : [...state[reducerKey], ...newState]
        : state ? { ...newState } : { ...state[reducerKey], ...newState };

    store.setState({
      ...state,
      [reducerKey]: reducerState
    });
  }
};

const ioReducer = (io, socket, action, store) => {
  Object.keys(reducers).map(reducerKey => {
    const state = store.getState();
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
