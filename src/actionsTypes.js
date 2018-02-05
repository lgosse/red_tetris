// New Game actions
export const NEW_GAME_CREATE = "NEW_GAME_CREATE";
export const NEW_GAME_JOIN = "JOIN_GAME";

// PartyList actions
export const PARTY_LIST = "server/party-list";
export const RESPONSE_PARTY_LIST = "RESPONSE_PARTY_LIST";

// Party actions
export const PARTY_GET = "PARTY_GET";
export const PARTY_SAVE = "PARTY_SAVE";
export const PARTY_ADD = "server/party-add";
export const PARTY_UPDATE = "PARTY_UPDATE";
export const PARTY_OPEN = "server/toggle-open-party";
export const PARTY_JOIN = "server/party-join";
export const PARTY_LEAVE = "server/party-leave";
export const PARTY_LEFT = "PARTY_LEFT";
export const PARTY_KICK_PLAYER = "server/party-kick-player";
export const PARTY_TOGGLE_PLAYING = "server/party-toggle-playing";

// Player actions
export const PLAYER_UPDATE = "PLAYER_UPDATE";
export const PLAYER_SAVE = "PLAYER_SAVE";
export const PLAYER_GET = "PLAYER_GET";

// Server actions
export const SERVER_PING = "server/ping";

// Router actions
export const LOCATION_CHANGE = "@@router/LOCATION_CHANGE";

// Alert actions
export const ALERT_POP = "ALERT_POP";
export const ALERT_RESET = "ALERT_RESET";
