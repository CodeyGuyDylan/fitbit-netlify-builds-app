import toggleBuilds from './toggleBuilds'
import initializeBuild from './initializeBuild'

// Activates builds, initializes a site build, and then deactivates the site builds
const runBuild = (siteId, access_token) => {
   return new Promise(async resolve => {
      let isActive
      let isInitialized
      let isInactive
      isActive = await toggleBuilds(siteId, access_token, false)
      if (isActive) {
         isInitialized = await initializeBuild(siteId, access_token)
      }
      if (isInitialized) {
         isInactive = await toggleBuilds(siteId, access_token, true)
      }
      if (isInactive) {
         resolve('success')
      } else {
         resolve('error')
      }
   })
}

export default runBuild
