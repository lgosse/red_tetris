import { ROOM_JOIN } from "../../actionsTypes";

export const joinRoom = roomName => {
  return {
    type: ROOM_JOIN,
    room: roomName
  };
};
