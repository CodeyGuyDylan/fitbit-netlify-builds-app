// Returns all deploys for a site
const getDeploys = (siteId, access_token) => {
   return new Promise(resolve => {
      fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
         method: 'GET',
         headers: {
            'User-Agent': 'NetlifyBuilds (design@novysolutions.com)',
            Authorization: `Bearer ${access_token}`,
         },
      })
         .then(response => {
            response.json().then(data => {
               if (data.length > 0) {
                  console.log('Deploys were fetched successfully')
                  resolve(data)
               } else {
                  console.log('Something went wrong')
                  resolve('error')
               }
            })
         })
         .catch(err => {
            console.error(`Error getting deploys: ${err}`)
            resolve('error')
         })
   })
}

export default getDeploys
