import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import globalStyle from '../../styles/global';

import { FullSizeContainer, Paragraph } from '../../components/helpers/Common';

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

const Ranks = ({ rankings }) => <div />;

const Ranking = ({ ranking }) => (
  <FullSizeContainer padding="20px">
    {ranking.length ? <Ranks ranking={ranking} /> : <NoRanks />}
  </FullSizeContainer>
);

const mapStateToProps = ({ ranking }) => ({ ranking });

export default connect(mapStateToProps)(Ranking);
