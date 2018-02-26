import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import globalStyle from '../../styles/global';

import {
  FullSizeContainer,
  Paragraph,
  LightContainer
} from '../../components/helpers/Common';

const NoRanks = () => (
  <Paragraph
    gameFont
    size="20px"
    center
    style={{ color: globalStyle.color.accent }}
  >
    NO RANKINGS YET
  </Paragraph>
);

const Rank = ({ score }) => (
  <LightContainer
    style={{
      display: 'flex',
      borderRadius: '5px',
      marginBottom: '20px',
      padding: globalStyle.padding.md
    }}
  >
    <Paragraph
      gameFont
      size="20px"
      center
      style={{
        color: globalStyle.color.primary,
        textAlign: 'left',
        paddingLeft: globalStyle.padding.md,
        width: '150px'
      }}
    >
      {score.score}
    </Paragraph>
    <Paragraph
      gameFont
      size="20px"
      center
      style={{
        color: globalStyle.color.primary,
        textAlign: 'left',
        paddingLeft: globalStyle.padding.md
      }}
    >
      {score.playerName}
    </Paragraph>
    <Paragraph
      gameFont
      size="20px"
      center
      style={{
        flex: 1,
        color: globalStyle.color.primary,
        textAlign: 'right',
        paddingLeft: globalStyle.padding.md
      }}
    >
      {new Date(score.date).toLocaleString()}
    </Paragraph>
  </LightContainer>
);

const Ranks = ({ ranking }) => (
  <div>{ranking.map((score, index) => <Rank key={index} score={score} />)}</div>
);

export const Ranking = ({ ranking }) => (
  <FullSizeContainer padding="20px">
    {ranking.length ? <Ranks ranking={ranking} /> : <NoRanks />}
  </FullSizeContainer>
);

const mapStateToProps = ({ ranking }) => {
  return { ranking };
};

export default connect(mapStateToProps)(Ranking);
