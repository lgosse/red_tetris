// New Game actions
export const NEW_GAME_CREATE = 'NEW_GAME_CREATE';
export const NEW_GAME_JOIN = 'JOIN_GAME';

// PartyList actions
export const PARTY_LIST = 'server/party-list';
export const RESPONSE_PARTY_LIST = 'RESPONSE_PARTY_LIST';

// Party actions
export const PARTY_ADD = 'server/party-add';
export const PARTY_UPDATE = 'PARTY_UPDATE';
export const PARTY_OPEN = 'server/toggle-open-party';
export const PARTY_JOIN = 'server/party-join';
export const PARTY_LEAVE = 'server/party-leave';
export const PARTY_LEFT = 'PARTY_LEFT';
export const PARTY_KICK_PLAYER = 'server/party-kick-player';
export const PARTY_START = 'server/party-toggle-playing';
export const PARTY_SEND_MESSAGE = 'server/send-message';
export const PARTY_RECEIVE_MESSAGE = 'PARTY_RECEIVE_MESSAGE';

//Music action
export const TOGGLE_MUSIC = 'TOGGLE_MUSIC';

// Player actions
export const PLAYER_UPDATE = 'PLAYER_UPDATE';
export const PLAYER_GET = 'PLAYER_GET';
export const PLAYER_TOGGLE_READY = 'server/player-toggle-ready';

export const RANKINGS_LIST = 'server/ranking-list';
export const RESPONSE_RANKINGS_LIST = 'RESPONSE_RANKINGS_LIST';

// Game actions
export const GAME_PIECES_PIECE_ROTATE_SERVER =
  'GAME_PIECES_PIECE_ROTATE_SERVER';
export const GAME_PIECES_PIECE_ROTATE_SUCCESS =
  'GAME_PIECES_PIECE_ROTATE_SUCCESS';
export const GAME_PIECES_PIECE_MOVE_SERVER = 'GAME_PIECES_PIECE_MOVE_SERVER';
export const GAME_PIECES_PIECE_MOVE_SUCCESS = 'GAME_PIECES_PIECE_MOVE_SUCCESS';
export const GAME_PIECES_CLAIM_PIECE = 'server/claim-piece';
export const GAME_PIECES_CLAIM_PIECE_SUCCESS = 'PLAYER_CLAIM_PIECE_SUCCESS';
export const GAME_BONUS_ADD = 'GAME_BONUS_ADD';
export const GAME_MALUS_ADD = 'GAME_MALUS_ADD';
export const GAME_MALUS_ADD_SUCCESS = 'GAME_MALUS_ADD_SUCCESS';
export const GAME_PIECES_UPDATE = 'GAME_PIECES_UPDATE';
export const GAME_PIECE_UPDATE = 'GAME_PIECE_UPDATE';

export const GAME_HAS_FOCUS = 'GAME_HAS_FOCUS';
export const GAME_LOSE_FOCUS = 'GAME_LOSE_FOCUS';
export const GAME_BOARD_DELETE_LINES = 'GAME_PIECES_DELETE_LINES';
export const GAME_BOARD_BLOCK_LINES_SERVER = 'GAME_BOARD_BLOCK_LINES_SERVER';
export const GAME_BOARD_BLOCK_LINES_SUCCESS = 'GAME_BOARD_BLOCK_LINES_SUCCESS';
export const GAME_BOARD_NOTIFY_GRID_UPDATE = 'server/notify-grid-update';
export const GAME_BOARD_UPDATE = 'GAME_BOARD_UPDATE';

export const GAME_LOSE = 'server/game-lose';
export const GAME_END = 'GAME_END';
export const GAME_DISPLAY_END = 'GAME_DISPLAY_END';
export const GAME_HIDE_END = 'GAME_HIDE_END';
export const GAME_MODS_SET = 'GAME_MODS_SET';

export const GAME_SCORE_UPDATE = 'GAME_SCORE_UPDATE';
export const GAME_SCORE_RESET = 'GAME_SCORE_RESET';

export const INPUT_KEYBOARD = 'INPUT_KEYBOARD';
export const REMOVE_INPUT_KEYBOARD = 'REMOVE_INPUT_KEYBOARD';

// Server actions
export const SERVER_PING = 'server/ping';
export const SERVER_PING_USER = 'server/pingUser';
export const SERVER_PONG_USER = 'server/pongUser';

// Router actions
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

// Alert actions
export const ALERT_POP = 'ALERT_POP';
export const ALERT_RESET = 'ALERT_RESET';
