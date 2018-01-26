import Player from "./Player";

class Party {
  constructor(partyObject) {
    this.id = partyObject.id;
    this.name = partyObject.name;
    this.size = partyObject.size;
    this.players = partyObject.players.map(player => new Player(player));
    this.open = true;
  }
}

export default Party;
