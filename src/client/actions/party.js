import {
  PARTY_GET,
  PARTY_SAVE,
  PARTY_ADD,
  PARTY_UPDATE,
  PARTY_JOIN,
  PARTY_LEAVE,
  PARTY_KICK_PLAYER,
  PARTY_OPEN,
  PARTY_START
} from "../../actionsTypes";

export const getParty = () => ({
  type: PARTY_GET
});

export const saveParty = party => ({
  type: PARTY_SAVE,
  party
});

export const addParty = (party, player) => ({
  type: PARTY_ADD,
  party,
  player
});

export const joinParty = (party, player) => ({
  type: PARTY_JOIN,
  party,
  player
});

export const leaveParty = () => ({
  type: PARTY_LEAVE
});

export const updateParty = party => ({
  type: PARTY_UPDATE,
  party
});

export const kickPlayer = playerId => ({
  type: PARTY_KICK_PLAYER,
  playerId
});

export const toggleOpenParty = partyId => ({
  type: PARTY_OPEN,
  partyId
});

export const startParty = partyId => ({
  type: PARTY_START,
  partyId
});

export const validatePartyHash = partyHash => {
  const [partyName, playerName] = partyHash.split("[");

  if (partyName.length === 0) return false;

  if (!playerName || playerName.length === 1 || playerName.length === 0)
    return false;

  return true;
};
