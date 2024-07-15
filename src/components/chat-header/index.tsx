import { h, FunctionComponent } from 'preact';
import { chatHeaderStyles } from '../styles';

const ChatHeader: FunctionComponent = () => (
  <div style={chatHeaderStyles.container}>
    <h3 style={chatHeaderStyles.title}>Conversation with Markov</h3>
  </div>
);

export default ChatHeader;