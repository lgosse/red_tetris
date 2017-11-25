import React from "react";
import styled from "styled-components";
import global from "../../styles/global";

const Code404 = styled.div`
  color: ${global.color.primary};
  font-family: ${global.font.family.game};
  font-size: 40px;
  text-align: center;
  width: 100%;
`;

const Message = styled.div`
  text-align: center;
  font-size: ${global.font.size.subtitle};
  color: ${global.color.primary};
  width: 300px;
  margin: auto;
`;

const containerStyle = {
  width: "100%"
};

const NotFound = () => {
  return (
    <div style={containerStyle}>
      <Code404>404</Code404>
      <Message>We're sorry but your requested page is unknown to us :(</Message>
    </div>
  );
};

export { containerStyle, Code404, Message };

export default NotFound;
