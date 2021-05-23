import * as messaging from 'messaging'

// Sends message to companion app
const sendMessage = message => {
   if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(message)
   }
}

export default sendMessage
