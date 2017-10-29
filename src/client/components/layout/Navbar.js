import React from "react";
import styled from "styled-components";
import global from "../../styles/global";
import { connect } from "react-redux";
import { Spacer } from "../helpers/Common";

const Bar = styled.div`
  width: 100%;
  display: flex;
  padding: ${global.padding.md};
  background-color: ${global.color.primary};
  color: ${global.color.accent};
  font-weight: ${global.font.weight.bold};
  box-shadow: ${global.shadow.light};
`;

const Title = styled.span`
  font-size: ${global.font.size.title};
  font-family: ${global.font.family.game};
  text-shadow: ${global.font.shadow.heavy};
`;

const Link = styled.button`
  color: ${global.color.accent};
  font-size: ${global.font.size.subtitle};
  font-family: ${global.font.family.game};
  text-shadow: ${global.font.shadow.light};
  transition: all 0.5s;
  background-color: unset;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    text-shadow: ${global.font.shadow.heavy};
  }
`;

const Navbar = () => {
  return (
    <Bar>
      <Title>RED TETRIS</Title>
      <Spacer />
      <Link>
        <i className="fa fa-trophy" /> RANKING
      </Link>
      <Link>
        <i className="fa fa-plus" /> NEW GAME
      </Link>
    </Bar>
  );
};

export default Navbar;
