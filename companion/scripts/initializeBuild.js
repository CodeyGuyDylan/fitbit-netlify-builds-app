// Starts a build
const initializeBuild = (siteId, access_token) => {
   return new Promise(resolve => {
      fetch(`https://api.netlify.com/api/v1/sites/${siteId}/builds`, {
         method: 'POST',
         headers: {
            'User-Agent': 'NetlifyBuilds (design@novysolutions.com)',
            Authorization: `Bearer ${access_token}`,
         },
      })
         .then(response => {
            response.json().then(data => {
               if (data.created_at) {
                  console.log('Site build was initialized')
                  resolve('success')
               } else {
                  console.log('Something went wrong')
                  resolve('error')
               }
            })
         })
         .catch(err => {
            console.error(`Error building site: ${err}`)
            resolve('error')
         })
   })
}

export default initializeBuild
