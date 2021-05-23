import document from 'document'

import sendMessage from './sendMessage'
import { openLoadingPage } from './setPages'

const setActions = info => {
   const {
      id: currentSite = null,
      stop_builds = null,
      deploy_id = null,
      locked = null,
   } = info || {}

   // Get actions list
   const actions = document.getElementById('actionList')

   // Get each action button
   const build = actions.getElementById('build')
   const publish_last_deploy = actions.getElementById('publish_last_deploy')
   const toggle_builds = actions.getElementById('toggle_builds')
   const toggle_auto_publish = actions.getElementById('toggle_auto_publish')

   // Get each touch property of each action button
   const call_build = build.getElementById('touch')
   const call_publish_last_deploy = publish_last_deploy.getElementById('touch')
   const call_toggle_builds = toggle_builds.getElementById('touch')
   const call_toggle_auto_publish = toggle_auto_publish.getElementById('touch')

   const templateAction = message => {
      actions.style.display = 'none'
      document.history.back()
      sendMessage(message)
      openLoadingPage()
   }

   const runBuild = () => {
      templateAction({ command: 'build', siteId: currentSite })
   }

   const publishLastBuild = () => {
      templateAction({ command: 'publish_last_build', siteId: currentSite })
   }

   const deactivateBuilds = () => {
      templateAction({ command: 'deactivate_builds', siteId: currentSite })
   }

   const activateBuilds = () => {
      templateAction({ command: 'activate_builds', siteId: currentSite })
   }

   const deactivateAutoPublish = () => {
      templateAction({ command: 'deactivate_auto_publish', deployId: deploy_id })
   }

   const activateAutoPublish = () => {
      templateAction({ command: 'activate_auto_publish', deployId: deploy_id })
   }

   call_build.onclick = runBuild
   call_publish_last_deploy.onclick = publishLastBuild

   if (stop_builds) {
      toggle_builds.text = 'Activate Builds'
      call_toggle_builds.onclick = activateBuilds
   } else {
      toggle_builds.text = 'Deactivate Builds'
      call_toggle_builds.onclick = deactivateBuilds
   }

   if (locked) {
      toggle_auto_publish.text = 'Activate Auto-Publish'
      call_toggle_auto_publish.onclick = activateAutoPublish
   } else {
      toggle_auto_publish.text = 'Deactivate Auto-Publish'
      call_toggle_auto_publish.onclick = deactivateAutoPublish
   }
}

export default setActions
