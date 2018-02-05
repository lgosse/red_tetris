import { ALERT_POP, ALERT_RESET } from "../../actionsTypes";

const effectsMiddleware = ({ dispatch, getState }) => next => action => {
  switch (action.type) {
    case ALERT_POP: {
      setTimeout(() => {
        dispatch({ type: ALERT_RESET });
      }, 3000);

      break;
    }

    default:
      break;
  }

  return next(action);
};

export default effectsMiddleware;
