import { GAME_MODS_SET } from "../../../actionsTypes";

export const setMod = mod => ({
  type: GAME_MODS_SET,
  mod
});
