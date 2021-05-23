import * as messaging from 'messaging'
import { settingsStorage } from 'settings'

import toggleBuilds from './scripts/toggleBuilds'
import toggleAutoPublish from './scripts/toggleAutoPublish'
import initializeBuild from './scripts/initializeBuild'
import querySites from './scripts/querySites'
import runBuild from './scripts/runBuild'
import publishLastBuild from './scripts/publishLastBuild'

// Netlify personal access token
let access_token = JSON.parse(settingsStorage.getItem('access_token')).name

// Handle messages from app
messaging.peerSocket.addEventListener('message', async evt => {
   const data = evt.data || {}
   const { command = null, siteId = null, deployId = null } = data

   const returnData = data => {
      if (data !== 'error') {
         returnQueryData(data)
      } else {
         returnQueryData('error')
      }
   }

   // Init response var
   let response

   // Run correct command
   switch (command) {
      case 'sites':
         response = await querySites(access_token)
         returnData(response)
         break
      case 'build':
         response = await runBuild(siteId, access_token)
         returnData(response)
         break
      case 'publish_last_build':
         response = await publishLastBuild(siteId, access_token)
         returnData(response)
         break
      case 'activate_builds':
         response = await toggleBuilds(siteId, access_token, false)
         returnData(response)
         break
      case 'deactivate_builds':
         response = await toggleBuilds(siteId, access_token, true)
         returnData(response)
         break
      case 'activate_auto_publish':
         response = await toggleAutoPublish(deployId, access_token, 'unlock')
         returnData(response)
         break
      case 'deactivate_auto_publish':
         response = await toggleAutoPublish(deployId, access_token, 'lock')
         returnData(response)
         break
   }
})

// Handle messaging errors
messaging.peerSocket.addEventListener('error', err => {
   const { code = null, message = null } = err || {}
   console.error(`Connection error: ${code} - ${message}`)
})

// Sends sites to app if connection is open
const returnQueryData = data => {
   if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(data)
   } else {
      console.error('Error: Connection is not open')
   }
}
