import Player from './Player';

class Party {
  constructor(id, partyObject) {
    this.id = id;
    this.name = partyObject.name;
    this.players = partyObject.players.map(player => new Player(player));
    this.open = true;
  }
}

export default Party;
