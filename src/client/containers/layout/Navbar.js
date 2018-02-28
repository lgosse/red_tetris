import React from 'react';
import styled from 'styled-components';
import global from '../../styles/global';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spacer } from '../../components/helpers/Common';

const Bar = styled.div`
  width: 100%;
  display: flex;
  padding: ${global.padding.md};
  background-color: ${global.color.primary};
  color: ${global.color.accent};
  font-weight: ${global.font.weight.bold};
  border-bottom: 1px solid #bb3c2f;
  background-image: ${global.assets.backgroundRed};
`;

const Title = styled.span`
  font-size: ${global.font.size.title};
  font-family: ${global.font.family.game};
  text-shadow: ${global.font.shadow.heavy};
  background-color: unset;
`;

const NavLink = styled.button`
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
      <Link to="/" id="home-link">
        <NavLink>
          <i className="fa fa-home" /> HOME
        </NavLink>
      </Link>
      <Link to="ranking" id="ranking-link">
        <NavLink>
          <i className="fa fa-trophy" /> RANKING
        </NavLink>
      </Link>
      <Link to="new-game" id="new-game-link">
        <NavLink>
          <i className="fa fa-plus" /> PLAY
        </NavLink>
      </Link>
    </Bar>
  );
};

const mapStateToNavbarProps = state => {
  return {};
};

// Testing purposes exports
export { Bar, Title, NavLink, Navbar, mapStateToNavbarProps };

export default connect(mapStateToNavbarProps, null)(Navbar);
