import React from "react";
import styled from "styled-components";
import global from "../../styles/global";

import { FlexSpacer, Paragraph, Icon } from "../helpers/Common";

const Bar = styled.div`
  width: 100%;
  display: flex;
  padding: ${global.padding.md};
  background-color: ${global.color.primary};
  color: ${global.color.accent};
  font-weight: ${global.font.weight.bold};
  border-top: 1px solid #bb3c2f;
  background-image: ${global.assets.backgroundRed};
`;

const Footer = () => {
  return (
    <Bar padding="20px">
      <FlexSpacer />
      <Paragraph size="16px" gameFont>
        Made with <Icon className="terminal" /> by lgosse
      </Paragraph>
    </Bar>
  );
};

export default Footer;
