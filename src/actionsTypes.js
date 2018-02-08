// New Game actions
export const NEW_GAME_CREATE = 'NEW_GAME_CREATE';
export const NEW_GAME_JOIN = 'JOIN_GAME';

// PartyList actions
export const PARTY_LIST = 'server/party-list';
export const RESPONSE_PARTY_LIST = 'RESPONSE_PARTY_LIST';

// Party actions
export const PARTY_GET = 'PARTY_GET';
export const PARTY_SAVE = 'PARTY_SAVE';
export const PARTY_ADD = 'server/party-add';
export const PARTY_UPDATE = 'PARTY_UPDATE';
export const PARTY_OPEN = 'server/toggle-open-party';
export const PARTY_JOIN = 'server/party-join';
export const PARTY_LEAVE = 'server/party-leave';
export const PARTY_LEFT = 'PARTY_LEFT';
export const PARTY_KICK_PLAYER = 'server/party-kick-player';
export const PARTY_START = 'server/party-toggle-playing';

// Player actions
export const PLAYER_UPDATE = 'PLAYER_UPDATE';
export const PLAYER_SAVE = 'PLAYER_SAVE';
export const PLAYER_GET = 'PLAYER_GET';
// Game actions
export const GAME_PIECES_PIECE_ROTATE = 'GAME_PIECES_PIECE_ROTATE';
export const GAME_PIECES_PIECE_ROTATE_SUCCESS =
  'GAME_PIECES_PIECE_ROTATE_SUCCESS';
export const GAME_PIECES_PIECE_MOVE = 'GAME_PIECES_PIECE_MOVE';
export const GAME_PIECES_PIECE_MOVE_SUCCESS = 'GAME_PIECES_PIECE_MOVE_SUCCESS';
export const GAME_PIECES_CLAIM_PIECE = 'server/claim-piece';
export const GAME_PIECES_CLAIM_PIECE_SUCCESS = 'PLAYER_CLAIM_PIECE_SUCCESS';
export const GAME_PIECES_UPDATE = 'GAME_PIECES_UPDATE';

export const GAME_BOARD_DELETE_LINES = 'GAME_PIECES_DELETE_LINES';
export const GAME_BOARD_NOTIFY_GRID_UPDATE = 'server/notify-grid-update';
export const GAME_BOARD_UPDATE = 'GAME_BOARD_UPDATE';

export const GAME_LOSE = 'server/game-lose';
export const GAME_RESET = 'GAME_RESET';

export const GAME_SCORE_UPDATE = 'GAME_SCORE_UPDATE';

// Server actions
export const SERVER_PING = 'server/ping';

// Router actions
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

// Alert actions
export const ALERT_POP = 'ALERT_POP';
export const ALERT_RESET = 'ALERT_RESET';
