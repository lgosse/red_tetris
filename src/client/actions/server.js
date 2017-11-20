export const SERVER_PING = "server/ping";

export const ping = () => {
  return {
    type: SERVER_PING
  };
};
