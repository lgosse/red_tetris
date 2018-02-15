import styled, { keyframes } from 'styled-components';
import globalStyle from './global';

const getColors = {
  '-1': 'radial-gradient(white, grey, black)',
  '0': 'transparent',
  '1': '#F44336', // red
  '2': '#E91E63', // pink
  '3': '#9C27B0', // purple
  '4': '#673AB7', // deep purple
  '5': '#3F51B5', // indigo
  '6': '#03A9F4', // light blue
  '7': '#4CAF50', // green
  '8': '#FFEB3B', // yellow
  '9': '#795548', // brown
  '10': '#FF9800', // orange
  '12': '#CDDC39', // lime green
  '13': '#f4f5f3' //blanc
};

const animations = {
  pulse: keyframes`
    from {
        background-color: transparent;
    }
    to {
        background-color: rgba(255, 255, 0, 0.7);
    }
  `,
  bombExplodeV: keyframes`
    from {
      background: linear-gradient(to right, red, yellow, red);
    }
    to {
      background: linear-gradient(to right, red, yellow, white, yellow, red);
    }
  `,
  bombExplodeH: keyframes`
    from {
      background: linear-gradient(to bottom, red, yellow, red);
    }
    to {
      background: linear-gradient(to bottom, red, yellow, white, yellow, red);
    }
  `,
  tnt: keyframes`
    from {
      background-color: yellow;
    }
    to {
      background-color: red;
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
  endMessage: {
    zIndex: '10000',
    textAlign: 'center',
    marginTop: '35vh',
    fontSize: '5vh',
    fontFamily: globalStyle.font.family.game,
    color: globalStyle.color.primary,
    textShadow: globalStyle.font.shadow.heavy
  },
  focusMessage: {
    width: '100%',
    height: '100%',
    position: 'relative',
    marginBottom: '-200%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
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
  tnt: {
    explode: x => {
      return {
        zIndex: '3',
        position: 'absolute',
        height: '4vh',
        width: '4vh',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        marginLeft: x * 4 + 'vh'
      };
    },
    anim: {
      animation: animations.bomb + ' 0.1s infinite',
      animationDirection: 'alternate'
    },
    base1: {
      position: 'absolute',
      height: '3vh',
      width: '3vh',
      marginLeft: '0.5vh',
      marginTop: '0.5vh',
      borderRadius: '15%',
      backgroundColor: 'red'
    },
    base2: {
      position: 'absolute',
      height: '3vh',
      width: '3vh',
      marginLeft: '0.5vh',
      marginTop: '0.5vh',
      borderRadius: '15%',
      backgroundColor: 'red',
      transform: 'rotate(45deg)'
    },
    circle: {
      position: 'absolute',
      height: '2vh',
      width: '2vh',
      marginLeft: '1vh',
      marginTop: '1vh',
      borderRadius: '50%',
      backgroundColor: 'yellow'
    },
    base: {
      position: 'absolute',
      margin: '10%',
      height: '80%',
      width: '80%',
      borderTop: 'solid 1px black',
      borderBottom: 'solid 1px black',
      background:
        'linear-gradient(to right, black, red, red, red, black, red, red, red, black, red, red, red, black)'
    },
    bip: {
      width: '1vh',
      height: '1vh',
      marginTop: '1.05vh',
      marginLeft: '1.1vh',
      border: 'solid 2px black',
      backgroundColor: 'yellow',
      borderRadius: '50%',
      animation: animations.tnt + ' 0.25s infinite',
      animationDirection: 'alternate'
    },
    bandes: {
      1: {
        position: 'absolute',
        height: '0.6vh',
        width: '3.6vh',
        margin: '0.2vh',
        marginTop: '0.9vh',
        backgroundColor: 'black'
      },
      2: {
        position: 'absolute',
        height: '0.6vh',
        width: '3.6vh',
        margin: '0.2vh',
        marginTop: '2.6vh',
        backgroundColor: 'black'
      }
    }
  },
  bomb: {
    explode: (x, y, axe) => {
      return {
        zIndex: '3',
        boxSizing: 'border-box',
        position: 'absolute',
        marginLeft: axe >= 1 ? x * 4 + 'vh' : '0',
        width: axe >= 1 ? '4vh' : '40vh',
        height: '4vh',
        background:
          axe === 0
            ? 'linear-gradient(red, yellow, red)'
            : axe === 1
              ? 'linear-gradient(to right, red, yellow, red)'
              : 'radial-gradient(circle, red, yellow, red)',
        animation:
          axe === 0
            ? animations.bombExplodeH + ' 0.2s infinite'
            : axe === 1 ? animations.bombExplodeV + ' 0.2s infinite' : 'none',
        animationDirection: 'alternate'
      };
    },
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
      background: getColors[color],
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
