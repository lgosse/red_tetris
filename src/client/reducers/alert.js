import { ALERT_POP } from "../../actionsTypes";

const alert = (state = {}, action) => {
  switch (action.type) {
    case ALERT_POP:
      return { message: action.message };
    default:
      return state;
  }
};

export default alert;
