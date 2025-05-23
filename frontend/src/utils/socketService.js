import { createContext } from 'react'
import { io } from 'socket.io-client'

class SocketService {
  constructor() {
    this.socket = null
  }

  connect() {
    if (!this.socket) {
      this.socket = io()
    }
    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }

  off(event) {
    if (this.socket) {
      this.socket.off(event)
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data)
    }
  }
}

let socketService = null
let SocketContext = null

export const initializeSocket = () => {
  if (!socketService) {
    socketService = new SocketService()
    SocketContext = createContext(null)
  }
  return { socketService, SocketContext }
}

export const getSocketService = () => {
  return socketService
}

export const getSocketContext = () => {
  return SocketContext
}
