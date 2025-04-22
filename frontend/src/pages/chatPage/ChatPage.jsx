import Layout from '../../components/Layout.jsx';
import ChatContainer from './components/ChatContainer.jsx';
import Channels from './components/Channels.jsx';
import Messages from './components/Messages.jsx';
import SendForm from './components/SendForm.jsx';

const ChatPage = () => (
  <Layout>
    <ChatContainer>
      <Channels />
      <Messages>
        <SendForm />
      </Messages>
    </ChatContainer>
  </Layout>
);

export default ChatPage;
