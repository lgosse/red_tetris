import React from 'react';
import { connect } from 'react-redux';
import {
  FlexContainer,
  FullSizeContainer,
  RedContainer,
  LightContainer,
  FlexSpacer
} from '../../components/helpers/Common';
import styled from 'styled-components';
import global from '../../styles/global';
import { sendMessage } from '../../actions/party';

const InputContainer = styled.form`
  display: flex;
  padding: 4px;
  min-height: 36px;
  height: 36px;
`;

const Input = styled.input`
  flex: 1;
  border-top-left-radius: ${global.border.radius};
  border-bottom-left-radius: ${global.border.radius};
  outline: none;
  border: none;
  padding: 5px;
  font-family: ${global.font.family.primary};
`;

const SendButton = styled.button`
  font-family: ${global.font.family.game};
  border-top-right-radius: ${global.border.radius};
  border-bottom-right-radius: ${global.border.radius};
  color: ${global.color.primary};
  border: none;
  outline: none;
`;

const MessagesContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow: scroll;
  padding: 12px;
`;

const OwnerMessage = styled.div`
  background-color: ${global.color.accent};
  max-width: 100%;
  border-radius: ${global.border.radius};
  margin-left: ${global.padding.md};
  padding: ${global.padding.sm};
  box-shadow: ${global.shadow.light};
  color: ${global.color.primary};
`;

const SenderName = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  ${props => props.right && `text-align: right`};
`;

const OtherMessage = styled.div`
  background-color: ${global.color.accent};
  max-width: 100%;
  border-radius: ${global.border.radius};
  margin-right: ${global.padding.md};
  padding: ${global.padding.sm};
  box-shadow: ${global.shadow.light};
  color: ${global.color.primary};
`;

const Messages = ({ messages, player }) => (
  <MessagesContainer
    id="messages-container"
    ref={() =>
      document.getElementById('messages-container') &&
      (document.getElementById(
        'messages-container'
      ).scrollTop = document.getElementById('messages-container').scrollHeight)
    }
  >
    {messages.map(
      (message, index) =>
        message.senderId === player.socketId ? (
          <FlexContainer key={index}>
            <FlexSpacer />
            <div style={{ marginTop: '10px' }}>
              <SenderName right>me</SenderName>
              <OwnerMessage>{message.text}</OwnerMessage>
            </div>
          </FlexContainer>
        ) : (
          <FlexContainer key={index}>
            <div style={{ marginTop: '10px' }}>
              <SenderName>{message.senderName}</SenderName>
              <OtherMessage>{message.text}</OtherMessage>
            </div>
            <FlexSpacer />
          </FlexContainer>
        )
    )}
  </MessagesContainer>
);

<a href="http://localhost:8081/forgotten-password/{uniquegeneratedtoken}">
  MON LIEN
</a>;

const Chat = ({ messages, player, handleSubmit }) => (
  <FlexContainer
    style={{
      margin: global.padding.sm,
      flex: 1
    }}
    direction="column"
  >
    {messages ? (
      <Messages messages={messages} player={player} />
    ) : (
      <div style={{ flex: 1 }} />
    )}
    <InputContainer onSubmit={handleSubmit}>
      <Input placeholder="Send message" name="message" id="message" />
      <SendButton>SEND</SendButton>
    </InputContainer>
  </FlexContainer>
);

const mapStateToProps = ({ party: { messages }, player }) => ({
  messages,
  player
});

const mapDispatchToProps = (dispatch, getState) => ({
  handleSubmit(event) {
    event.preventDefault();
    const message = document.getElementById('message').value.trim();
    if (message.length > 0) {
      dispatch(sendMessage(message));
      document.getElementById('message').value = '';
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
