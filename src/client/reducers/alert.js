import { ALERT_POP, ALERT_RESET } from "../../actionsTypes";

const alert = (state = {}, action) => {
  switch (action.type) {
    case ALERT_POP:
      return { message: action.message };
    case ALERT_RESET:
      return {};
    default:
      return state;
  }
};

export default alert;
