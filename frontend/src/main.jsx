import ReactDOM from 'react-dom/client'
import App from './App'
import { SocketContext, socketService } from './utils/socketService.js'
import store from './store/store.js'
import apiClient from './store/apiClient.js'

const initializeApp = () => {
  socketService.connect()

  const updateMessages = (newMessage) => {
    store.dispatch(apiClient.util.updateQueryData('getMessages', undefined, (draftMessages) => {
      draftMessages.push(newMessage)
    }))
  }

  socketService.on('newMessage', updateMessages)

  return (
    <SocketContext.Provider value={socketService}>
      <App />
    </SocketContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(initializeApp())
