import React from 'react';
import { connect } from 'react-redux';
import RightSide from '../../components/game/RightSide';
import LeftSide from '../../components/game/LeftSide';
import Grid from './Grid';

export const Game = ({ party, player, game }) => {
  const maptest = [
    [0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 0, 1, 0, 0, 1, 1, 1],
    [1, 1, 0, 1, 0, 0, 1, 1, 1]
  ];

  party.players = [
    {
      nickname: 'Lucas',
      map: maptest
    },
    {
      nickname: 'Thomas',
      map: maptest
    },
    {
      nickname: 'Aymée',
      map: maptest
    },
    {
      nickname: 'Otmane',
      map: maptest
    }
  ];
  return (
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
      <RightSide players={party.players} />
    </div>
  );
};

export const mapStateToGameProps = ({ party, player, game }) => ({
  party,
  player,
  game
});

export default connect(mapStateToGameProps)(Game);
