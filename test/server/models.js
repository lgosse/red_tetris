import chai from 'chai';
import { Player } from '../../src/server/models/Player';
import { gridZero } from '../../src/client/reducers/game/utils';
import { Piece, PieceBonus, PieceMalus } from '../../src/server/models/Piece';
import { Ranking } from '../../src/server/models/Ranking';
import { Game } from '../../src/server/models/Game';

describe('Server Models', () => {
  describe('Player', () => {
    it('should initialize a new object Player', () => {
      const player = new Player({ nickname: 'ThomasLucas', socketId: '<34567890' });
      player.should.be.deep.equal({
        nickname: 'ThomasLucas',
        socketId: '<34567890',
        map: gridZero(10, 20),
        lose: false,
        ready: false,
        score: 0,
        ping: 0,
        lastPing: 0,
      });
    });
    it('should update a player', () => {
      const player = new Player({ nickname: 'ThomasLucas', socketId: '42' });
      player.update({ nickname: '354', lose: true, score: 6 });
      player.should.be.deep.equal({
        nickname: '354',
        socketId: '42',
        map: gridZero(10, 20),
        lose: true,
        ready: false,
        score: 6,
        ping: 0,
        lastPing: 0,
      });
    });
  });

  describe('Piece', () => {
    it('should create randomly a new object Piece', () => {
      const piece = new Piece();
      piece.grid.length.should.be.within(2, 4);      
      piece.x.should.equal(4);
      piece.y.should.equal(0);
      const pieceBonus = new PieceBonus();
      pieceBonus.grid.length.should.equal(1);      
      pieceBonus.x.should.equal(4);
      pieceBonus.y.should.equal(0);
      const pieceMalus = new PieceMalus();
      pieceMalus.grid.length.should.be.within(1, 3);      
      pieceMalus.x.should.equal(4);
      pieceMalus.y.should.equal(0);
    });
  });

  describe('Game', () => {
    const game = new Game({ name: 'game', size: 3, withBonus: true });
    const player1 = new Player({ nickname: 'Thomas', socketId: '1' });
    const player2 = new Player({ nickname: 'Lucas', socketId: '2' });
    const player3 = new Player({ nickname: 'toto', socketId: '3' });
    it('should create a new Object Game', () => {
      game.should.be.deep.equal({
        name: 'game',
        size: 3,
        open: true,
        playing: false,
        players: [],
        withBonus: true,
      });
    });
    it('should should update the Game instance', () => {
      game.toggleOpen()
      game.open.should.equal(false);
      
      game.toggleOpen()
      game.startGame()
      game.playing.should.equal(true)
      game.open.should.equal(false);
      
      game.stopGame()
      game.playing.should.equal(false);
      
      game.addPlayer(player1)
      game.addPlayer(player2)
      game.players.length.should.equal(2);

      game.removePlayer('2')
      game.players.length.should.equal(1);

      game.solo.should.equal(true);
      game.isOver().should.equal(false);

      game.addPlayer(player2)
      game.addPlayer(player3)
      game.updatePlayer({...player3, lose: true})
      game.players[2].lose.should.equal(true);

      game.solo.should.equal(false);

      game.incrementPlayerScore('3', 42)
      game.players[2].score.should.equal(42);

      game.findAlivePlayers().length.should.equal(2);
      
      game.getPlayerBySocketId('1').nickname.should.equal('Thomas');

      game.isOver().should.equal(false);
      game.updatePlayer({...player2, lose: true});
      game.isOver().should.equal(true);

      game.clearPlayersBoard();
      game.findAlivePlayers().length.should.equal(3);
    });
  });
  
  describe('Ranking', () => {
    it('should create a new Object Ranking', () => {
      const ranking = new Ranking({ score: 9000, playerName: 'Thomas' });
      ranking.score.should.equal(9000); 
      ranking.playerName.should.equal('Thomas');
    });
  });
});