import styled, { keyframes } from 'styled-components';

const getColors = [
  ['transparent'],
  ['red'],
  ['grey'],
  ['blue'],
  ['green'],
  ['red'],
  ['grey'],
  ['blue'],
  ['black']
];

const animations = {
  pulse: keyframes`
    from {
        background-color: transparent;
    }
    to {
        background-color: rgba(255, 255, 0, 0.7);
    }
  `,
  fire: keyframes`
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.8);
      margin-left: 0.7vh; 
    }
  `,
  bomb: keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.9);
    margin-left: -0.8vh; 
  }
`,
  reflect: keyframes`
    from {
      background: radial-gradient(circle at 0.5vh 0.5vh, yellow, blue);
    }
    to {
      background: radial-gradient(circle at 0.5vh 0.5vh, white, blue);
    }
  `
};

const gameStyle = {
  animations,
  grid: {
    boxShadow: '0px 0px 40px black inset',
    height: '80vh',
    minHeight: '80vh',
    width: '40vh',
    minWidth: '40vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  line: {
    height: '5%',
    display: 'flex',
    justifyContent: 'stretch'
  },
  calque: {
    zIndex: '9000',
    position: 'absolute',
    height: '80vh',
    minHeight: '80vh',
    width: '40vh',
    minWidth: '40vh'
  },
  piece: position => {
    return {
      position: 'absolute',
      marginTop: position.y * 4 + 'vh',
      marginLeft: position.x * 4 + 'vh',
      height: '4vh',
      minHeight: '4vh',
      width: '4vh',
      minWidth: '4vh'
    };
  },
  lineDestroying: {
    zIndex: '500',
    position: 'absolute',
    height: '4vh',
    width: '40vh',
    backgroundColor: 'transparent',
    animation: animations.pulse + ' 0.1s infinite',
    animationDirection: 'alternate'
  },
  pieces: {
    all: position =>
      position
        ? {
            position: 'relative',
            marginTop: `${position.y * 4}vh`,
            marginLeft: `${position.x * 4}vh`,
            transition: 'all 0.1s',
            transitionTimingFunction: 'linear'
          }
        : undefined,
    t1: {
      width: '4vh',
      height: '16vh'
    },
    t2: {
      width: '8vh',
      height: '12vh'
    },
    t3: {
      width: '8vh',
      height: '12vh'
    },
    t4: {
      width: '8vh',
      height: '8vh'
    },
    t5: {
      width: '12vh',
      height: '8vh'
    },
    t6: {
      width: '12vh',
      height: '8vh'
    },
    t7: {
      width: '12vh',
      height: '8vh'
    }
  },
  bomb: {
    all: {
      zIndex: '2',
      display: 'inline-flex',
      width: '4vh',
      height: '4vh',
      border: '2px solid black',
      borderRadius: '50%',
      background: 'radial-gradient(circle at 1vh 1vh, blue, black)'
    },
    reflect: {
      position: 'absolute',
      zIndex: '2',
      marginLeft: '0.7vh',
      marginTop: '0.6vh',
      width: '1vh',
      height: '1.4vh',
      background: 'radial-gradient(circle at 0.5vh 0.5vh, yellow, blue)',
      borderRadius: '50%',
      transform: 'rotate(40deg)',
      animation: animations.reflect + ' 0.1s infinite',
      animationDirection: 'alternate'
    },
    mech: {
      zIndex: '1.5',
      position: 'absolute',
      width: '2vh',
      height: '2.5vh',
      borderRight: '4px solid white',
      borderRadius: '50%',
      transform: 'rotate(35deg)',
      marginTop: '-1.1vh',
      marginLeft: '1.6vh'
    },
    fire: {
      zIndex: '2',
      position: 'absolute',
      width: '1vh',
      height: '2vh',
      borderStyle: 'solid',
      borderWidth: '0 0.7vh 1.8vh 0.7vh',
      borderColor: 'transparent transparent red transparent',
      borderBottomLeftRadius: '50%',
      borderBottomRightRadius: '50%',
      marginTop: '-2.1vh',
      marginLeft: '2.8vh'
    },
    fire2: {
      zIndex: '3',
      position: 'absolute',
      width: '1vh',
      height: '1.8vh',
      borderStyle: 'solid',
      borderWidth: '0 0.5vh 1.4vh 0.5vh',
      borderColor: 'transparent transparent orange transparent',
      borderBottomLeftRadius: '50%',
      borderBottomRightRadius: '50%',
      marginTop: '-1.95vh',
      marginLeft: '3vh'
    },
    fire3: {
      zIndex: '4',
      position: 'absolute',
      width: '0.7vh',
      height: '1vh',
      borderStyle: 'solid',
      borderWidth: '0 0.3vh 0.7vh 0.3vh',
      borderColor: 'transparent transparent yellow transparent',
      borderBottomLeftRadius: '50%',
      borderBottomRightRadius: '50%',
      marginTop: '-1.2vh',
      marginLeft: '3.15vh'
    }
  },
  square: color => {
    return {
      zIndex: color == 0 ? '0' : '2',
      display: 'inline-flex',
      width: '4vh',
      height: '4vh',
      backgroundColor: getColors[color],
      border: color == 0 ? 'none' : '1px solid black'
    };
  },
  squareIn: color => {
    return {
      margin: color == 0 ? '0px' : '4%',
      width: color == 0 ? '100%' : '92%',
      height: color == 0 ? '100%' : '92%',
      border:
        color == 0
          ? '1px solid rgba(0, 0, 0, 0.2)'
          : '1vh solid rgba(255, 255, 255, 0.2)',
      borderRight:
        color == 0
          ? '1px solid rgba(0, 0, 0, 0.2)'
          : '1vh solid rgba(0, 0, 0, 0.2)',
      borderBottom:
        color == 0
          ? '1px solid rgba(0, 0, 0, 0.2)'
          : '1vh solid rgba(0, 0, 0, 0.2)'
    };
  }
};

export default gameStyle;
