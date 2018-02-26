import React from 'react';
import global from '../../styles/global';
import gameStyle from '../../styles/gameStyle';

export const Bomb = () => (
  <div
    style={{
      width: '4vh',
      height: '4vh',
      zIndex: '2'
    }}
  >
    <div
      style={{
        display: 'flex',
        animation: gameStyle.animations.bomb + ' 0.2s infinite',
        animationDirection: 'alternate'
      }}
    >
      <div style={gameStyle.bomb.all} />
      <div style={gameStyle.bomb.mech} />
      <div style={gameStyle.bomb.reflect} />
      <div
        style={{
          position: 'absolute',
          transform: 'rotate(-10deg)',
          animation: gameStyle.animations.fire + ' 0.1s infinite',
          animationDirection: 'alternate'
        }}
      >
        <div style={gameStyle.bomb.fire} />
        <div style={gameStyle.bomb.fire2} />
        <div style={gameStyle.bomb.fire3} />
      </div>
    </div>
  </div>
);

export const Dynamite = () => (
  <div
    style={{
      width: '4vh',
      height: '4vh',
      zIndex: '2',
      position: 'relative'
    }}
  >
    <div style={gameStyle.tnt.base}>
      <div style={gameStyle.tnt.bip} />
    </div>
    <div style={gameStyle.tnt.bandes[1]} />
    <div style={gameStyle.tnt.bandes[2]} />
  </div>
);

export const BedRock = () => (
  <div style={gameStyle.square(0)}>
    <div
      style={{
        zIndex: '0',
        backgroundColor: 'rgba(255, 250, 205, 0.05)',
        width: '4vh',
        height: '4vh',
        position: 'absolute'
      }}
    />
    <div style={gameStyle.squareIn(0)} />
  </div>
);

export const StandardBlock = ({ color }) => (
  <div style={gameStyle.square(color)}>
    <div style={gameStyle.squareIn(color)} />
  </div>
);

const Square = ({ color }) => {
  switch (color) {
    case 10:
      return <Bomb />;
    case 11:
      return <Dynamite />;
    case 42:
      return <BedRock />;
    default:
      return <StandardBlock color={color} />;
  }
};

export default Square;
