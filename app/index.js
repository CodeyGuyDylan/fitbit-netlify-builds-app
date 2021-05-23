import document from 'document'
import * as messaging from 'messaging'

import setActions from './scripts/setActions'
import sendMessage from './scripts/sendMessage'
import { openHomePage, openSuccessPage, openErrorPage } from './scripts/setPages'
import { enableLoadingAnimation } from './scripts/enableAnimations'

let currentSite = ''
let eventsListenerOn = false

// Turns on loading spinner
enableLoadingAnimation()

// Loads all sites from companion app
const processSitesData = data => {
   // Opens home page when site data is loaded
   openHomePage()

   let myList = document.getElementById('sitesList')

   let NUM_ELEMS = data.length

   // Creates a list item for each site that exists
   myList.delegate = {
      getTileInfo: index => {
         const {
            id = null,
            domain = null,
            deploy_id = null,
            stop_builds = null,
            locked = null,
         } = data[index] || {}

         return {
            type: 'my-sites',
            id: id,
            value: domain,
            deploy_id: deploy_id,
            stop_builds: stop_builds,
            locked: locked,
            index: index,
         }
      },
      configureTile: (tile, info) => {
         if (info.type == 'my-sites') {
            tile.getElementById('text').text = info.value

            let touch = tile.getElementById('touch')

            // Sets each list item to go to actions view on touch
            touch.onclick = async () => {
               await document.location.assign('./resources/actions.view')
               setActions(info)
            }
         }
      },
   }

   // length must be set AFTER delegate
   myList.length = NUM_ELEMS
}

// Requests sites on app open
messaging.peerSocket.addEventListener('open', () => {
   sendMessage({ command: 'sites' })
})

// Processes message to companion app
messaging.peerSocket.addEventListener('message', e => {
   // If companion sends back success, opens success page for 1 second and then goes to home page
   if (e.data === 'success') {
      openSuccessPage()

      sendMessage({ command: 'sites' })

      setTimeout(() => {
         openHomePage()
      }, 1000)
   } else if (e.data === 'error') {
      openErrorPage()

      setTimeout(() => {
         openHomePage()
      }, 1000)
   }
   // If companion sends back any other data, it means it was querying the sites
   else if (e.data) {
      processSitesData(e.data)
   }
})
