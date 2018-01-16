import { ALERT_POP } from "../../actionsTypes";

export const alert = message => {
  return {
    type: ALERT_POP,
    message
  };
};
