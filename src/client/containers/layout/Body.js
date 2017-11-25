import styled from "styled-components";
import global from "../../styles/global";

const Body = styled.div`
  width: 100%;
  background-color: ${global.color.primary};
  background-image: ${global.assets.backgroundRed};
  min-height: calc(100vh - 111px);
`;

export default Body;
