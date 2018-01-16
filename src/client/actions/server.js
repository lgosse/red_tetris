import { SERVER_PING } from "../../actionsTypes";

export const ping = () => {
  return {
    type: SERVER_PING
  };
};
