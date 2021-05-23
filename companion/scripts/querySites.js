import * as messaging from 'messaging'

// Gets all sites from netlify and sends them to watch app
const querySites = access_token => {
   return new Promise(resolve => {
      fetch('https://api.netlify.com/api/v1/sites', {
         method: 'GET',
         headers: {
            'User-Agent': 'MyApp (design@novysolutions.com)',
            Authorization: `Bearer ${access_token}`,
         },
      })
         .then(response => {
            response.json().then(data => {
               const sites = []

               // Extracts relevant data from response body
               data.map(site => {
                  sites.push({
                     id: site.id,
                     domain: site.custom_domain,
                     stop_builds: site.build_settings.stop_builds,
                     deploy_id: site.published_deploy.id,
                     locked: site.published_deploy.locked,
                  })
               })

               resolve(sites)
            })
         })
         .catch(err => {
            console.error(`Error fetching sites: ${err}`)
            resolve('error')
         })
   })
}

export default querySites
