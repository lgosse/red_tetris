import { SERVER_PING, SERVER_PING_USER, SERVER_PONG_USER } from '../../actionsTypes';

const server = (state = {}, action) => {
  switch (action.type) {
    case SERVER_PING:
      return {};
    case SERVER_PING_USER: {
      return {};
    }
    case SERVER_PONG_USER: {
      return {};
    }
    default:
      return state;
  }
};

export default server;
