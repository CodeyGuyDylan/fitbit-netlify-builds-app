import getDeploys from './getDeploys'
import toggleAutoPublish from './toggleAutoPublish'

// Publishes last deploy with a state of 'ready'
const publishLastBuild = (siteId, access_token) => {
   return new Promise(async resolve => {
      // Get all deploys
      const deploys = await getDeploys(siteId, access_token)

      // Filter out any failed or canceled deploys
      const filteredDeploys = deploys.filter(deploy => {
         return deploy.state === 'ready'
      })

      // Get id of last successful deploy
      const lastSuccessfulDeployId = filteredDeploys[0].id

      // Publish last successful deploy
      fetch(
         `https://api.netlify.com/api/v1/sites/${siteId}/deploys/${lastSuccessfulDeployId}/restore`,
         {
            method: 'POST',
            headers: {
               'User-Agent': 'NetlifyBuilds (design@novysolutions.com)',
               Authorization: `Bearer ${access_token}`,
            },
         }
      )
         .then(response => {
            response.json().then(data => {
               if (data.id) {
                  // Lock published deploy
                  toggleAutoPublish(lastSuccessfulDeployId, access_token, 'lock')
                  console.log('Last deploy was publish successfully')
                  resolve('success')
               } else {
                  console.log('Something went wrong')
                  resolve('error')
               }
            })
         })
         .catch(err => {
            console.error(`Error publishing deploy: ${err}`)
            resolve('error')
         })
   })
}

export default publishLastBuild
