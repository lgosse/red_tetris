// Models
import GameModel, { Game } from "../models/Game";
import { Player } from "../models/Player";

// Action Types
import {
  PARTY_LIST,
  RESPONSE_PARTY_LIST,
  PARTY_ADD,
  PARTY_JOIN,
  ALERT_POP,
  PARTY_UPDATE,
  PARTY_LEAVE,
  PARTY_KICK_PLAYER,
  PARTY_OPEN,
  PARTY_START,
  PARTY_LEFT
} from "../../actionsTypes";

// Actions
import { push } from "react-router-redux";
import { updateParty, startPartySuccess } from "../../client/actions/party";
import {
  claimPieceSuccess,
  movePieceServer
} from "../../client/actions/game/pieces";
import { Piece } from "../models/Piece";
import { updatePiecesGame } from "../../client/actions/game/pieces";
import { updateBoard } from "../../client/actions/game/board";
import { updateScore, resetScore } from "../../client/actions/game/score";

export const userLeaves = async (io, socket) => {
  if (!socket.partyId) return;

  let party;
  try {
    party = await GameModel.findById(socket.partyId).exec();
  } catch (error) {
    console.error(error);
  }
  if (!party) {
    console.error(`Party ${socket.partyId} not found!`);
    return;
  }

  if (party.getPlayerBySocketId(socket.id)) {
    party.removePlayer(socket.id);
    delete socket.partyId;
    if (!socket.fake) {
      socket.leave(party._id, err => {
        if (err) console.error(err);
        socket.emit("action", { type: PARTY_LEFT });
      });
    }
  }

  if (party.players.length === 0) {
    await party.remove();
  } else {
    try {
      await party.save();
    } catch (error) {
      if (error.name !== "VersionError") console.error(error);
    }
  }

  io.to(party._id).emit("action", {
    type: PARTY_UPDATE,
    party
  });

  io.emit("action", await getParties());
};

export const getParties = async () => {
  const partyList = await GameModel.find({}).exec();

  return {
    type: RESPONSE_PARTY_LIST,
    partyList
  };
};

const partyList = async (action, io, socket) => {
  switch (action.type) {
    case PARTY_LIST: {
      socket.emit("action", await getParties());
      break;
    }

    case PARTY_ADD: {
      let party;

      try {
        party = await GameModel.findOne({ name: action.party.name }).exec();
      } catch (error) {
        console.error(error);
      }

      if (party) {
        socket.emit("action", {
          type: ALERT_POP,
          message: "This party name is not available! Choose another one."
        });

        return;
      }

      try {
        party = await new GameModel(new Game(action.party)).save();
      } catch (error) {
        console.error(error);
        socket.emit("action", {
          type: ALERT_POP,
          message: "An error occured. Cannot save the party"
        });

        break;
      }

      io.emit("action", await getParties());
      socket.emit("action", push(`/#${party.name}[${action.player.nickname}]`));
      break;
    }

    case PARTY_JOIN: {
      let party;
      try {
        party = await GameModel.findOne({ name: action.party.name }).exec();
      } catch (error) {
        console.error(error);
      }

      let partyEdit;
      if (!party) {
        try {
          partyEdit = await new GameModel(new Game(action.party));
        } catch (error) {
          console.error(error);
        }

        if (!partyEdit) {
          socket.emit("action", {
            type: ALERT_POP,
            message: "A problem occured while trying to join your party."
          });
        }
      } else {
        partyEdit = party;
        if (party.open === false) {
          socket.emit("action", push("/"));
          return;
        }
      }

      if (partyEdit.players.length < partyEdit.size) {
        partyEdit.addPlayer(
          new Player({
            ...action.player,
            socketId: socket.id
          })
        );

        try {
          await partyEdit.save();
        } catch (error) {
          if (error.name !== "VersionError") console.error(error);
        }

        io.emit("action", await getParties());
      }

      socket.partyId = partyEdit._id;
      socket.join(partyEdit._id);
      io.to(partyEdit._id).emit("action", {
        type: PARTY_UPDATE,
        party: partyEdit
      });

      break;
    }

    case PARTY_LEAVE: {
      userLeaves(io, socket);
      break;
    }

    case PARTY_KICK_PLAYER: {
      if (io.sockets.connected[action.playerId])
        io.sockets.connected[action.playerId].emit("action", push("/"));

      break;
    }

    case PARTY_OPEN: {
      let party;
      try {
        party = await GameModel.findById(action.partyId).exec();
      } catch (error) {
        console.error(error);
      }
      if (!party) return;

      party.toggleOpen();
      party.save().then(async res => {
        io.emit("action", await getParties());
        io.to(party._id).emit("action", {
          type: PARTY_UPDATE,
          party
        });
      });

      break;
    }

    case PARTY_START: {
      let party;
      try {
        party = await GameModel.findById(action.partyId).exec();
      } catch (error) {
        console.error(error);
      }
      if (!party) return;

      party.startGame();

      try {
        await party.save();

        io.emit("action", await getParties());
        io.to(party._id).emit("action", startPartySuccess());
        io.to(party._id).emit("action", updateParty(party));
        io
          .to(party._id)
          .emit("action", updatePiecesGame({ piece: new Piece() }));
        io
          .to(party._id)
          .emit("action", claimPieceSuccess([new Piece(), new Piece()]));
      } catch (error) {
        if (error.name !== "VersionError") console.error(error);
      }

      break;
    }

    case "PARTY_DELETE_ALL": {
      try {
        await GameModel.remove({}).exec();
      } catch (error) {
        console.error(error);
      }

      break;
    }
  }
};

export default partyList;
