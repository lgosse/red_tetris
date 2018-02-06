import styled, { keyframes } from "styled-components";

const getColors = [
  ["transparent"],
  ["red"],
  ["grey"],
  ["blue"],
  ["green"],
  ["red"],
  ["grey"],
  ["blue"],
  ["black"]
];

const animations = {
  pulse: keyframes`
        from {
            background-color: transparent;
        }
        to {
            background-color: rgba(255, 255, 0, 0.7);
        }
    `
};

const gameStyle = {
  grid: {
    boxShadow: "0px 0px 40px black inset",
    height: "80vh",
    minHeight: "80vh",
    width: "40vh",
    minWidth: "40vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  line: {
    height: "5%",
    display: "flex",
    justifyContent: "stretch"
  },
  calque: {
    zIndex: "9000",
    position: "absolute",
    height: "80vh",
    minHeight: "80vh",
    width: "40vh",
    minWidth: "40vh"
  },
  piece: position => {
    return {
      position: "absolute",
      marginTop: position.y * 4 + "vh",
      marginLeft: position.x * 4 + "vh",
      height: "4vh",
      minHeight: "4vh",
      width: "4vh",
      minWidth: "4vh"
    };
  },
  lineDestroying: {
    zIndex: "500",
    position: "absolute",
    height: "4vh",
    width: "40vh",
    backgroundColor: "transparent",
    animation: animations.pulse + " 0.2s infinite",
    animationDirection: "alternate"
  },
  pieces: {
    all: position =>
      position
        ? {
            position: "relative",
            marginTop: `${position.y * 4}vh`,
            marginLeft: `${position.x * 4}vh`,
            transition: "all 1s",
            transitionTimingFunction: "linear"
          }
        : undefined,
    t1: {
      width: "4vh",
      height: "16vh"
    },
    t2: {
      width: "8vh",
      height: "12vh"
    },
    t3: {
      width: "8vh",
      height: "12vh"
    },
    t4: {
      width: "8vh",
      height: "8vh"
    },
    t5: {
      width: "12vh",
      height: "8vh"
    },
    t6: {
      width: "12vh",
      height: "8vh"
    },
    t7: {
      width: "12vh",
      height: "8vh"
    }
  },
  square: color => {
    return {
      zIndex: color == 0 ? "0" : "2",
      display: "inline-flex",
      width: "4vh",
      height: "4vh",
      backgroundColor: getColors[color],
      border: color == 0 ? "none" : "1px solid black"
    };
  },
  squareIn: color => {
    return {
      margin: color == 0 ? "0px" : "4%",
      width: color == 0 ? "100%" : "92%",
      height: color == 0 ? "100%" : "92%",
      border:
        color == 0
          ? "1px solid rgba(0, 0, 0, 0.2)"
          : "1vh solid rgba(255, 255, 255, 0.2)",
      borderRight:
        color == 0
          ? "1px solid rgba(0, 0, 0, 0.2)"
          : "1vh solid rgba(0, 0, 0, 0.2)",
      borderBottom:
        color == 0
          ? "1px solid rgba(0, 0, 0, 0.2)"
          : "1vh solid rgba(0, 0, 0, 0.2)"
    };
  }
};

export default gameStyle;
