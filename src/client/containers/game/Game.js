import React from 'react';
import { connect } from 'react-redux';
import RightSide from '../../components/game/RightSide';
import LeftSide from '../../components/game/LeftSide';
import Grid from './Grid';

export const Game = ({ party, player, game }) => (
  <div
    style={{
      width: '100%',
      paddingRight: '10%',
      paddingLeft: '10%',
      display: 'flex'
    }}
  >
    <LeftSide party={party} player={player} game={game} />
    <Grid party={party} player={player} />
    <RightSide
      players={party.players.filter(
        currentPlayer => player.socketId !== currentPlayer.socketId
      )}
    />
  </div>
);

export const mapStateToGameProps = ({ party, player, game }) => ({
  party,
  player,
  game
});

export default connect(mapStateToGameProps)(Game);
