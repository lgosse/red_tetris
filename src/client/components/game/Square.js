import React from 'react';
import global from '../../styles/global';
import gameStyle from '../../styles/gameStyle';

const Square = ({ color }) => {
  if (color === 10) {
    // Bomb
    return (
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
  } else if (color === 11) {
    // Dynamite
    return (
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
  } else if (color === 42) {
    return (
      <div style={gameStyle.square(0)}>
        <div style={{zIndex: '0', backgroundColor: 'rgba(255, 250, 205, 0.05)', width: '4vh', height: '4vh', position: 'absolute'}} />
        <div style={gameStyle.squareIn(0)} />
      </div>
    );
  } else {
    return (
      <div style={gameStyle.square(color)}>
        <div style={gameStyle.squareIn(color)} />
      </div>
    );
  }
};

export default Square;
