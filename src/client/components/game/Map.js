import React from 'react';
import global from '../../styles/global';
import styled from 'styled-components';
import { FlexContainer, FullSizeContainer } from '../helpers/Common';

export const MapVoid = styled.div`
  flex: 1;
  margin-left: 1px;
  margin-top: 1px;
`;

export const MapItem = styled.div`
  background-color: ${global.color.accent};
  flex: 1;
  margin-left: 1px;
  margin-top: 1px;
`;

export const Line = ({ line }) => (
  <FlexContainer flex>
    {line.map(
      (column, index) =>
        column === 0 ? <MapVoid key={index} /> : <MapItem key={index} />
    )}
  </FlexContainer>
);

export const LinesContainer = FlexContainer.extend`
  flex-direction: column;
  height: 155px;
`;

const Map = ({ map }) => (
  <LinesContainer>
    {map.map((line, index) => <Line line={line} key={index} />)}
  </LinesContainer>
);

export default Map;
