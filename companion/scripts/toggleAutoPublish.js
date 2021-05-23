const toggleAutoPublish = (deployId, access_token, toggle) => {
   return new Promise(resolve => {
      // Sends http PATCH request to netlify to either activate or deactivate builds
      fetch(`https://api.netlify.com/api/v1/deploys/${deployId}/${toggle}`, {
         method: 'POST',
         headers: {
            'User-Agent': 'NetlifyBuilds (design@novysolutions.com)',
            Authorization: `Bearer ${access_token}`,
         },
      })
         .then(response => response.json())
         .then(data => {
            if (data.id) {
               console.log(
                  `Auto Publish was successfully toggled ${toggle === 'unlock' ? 'on' : 'off'}`
               )
               resolve('success')
            } else {
               resolve('error')
            }
         })
         .catch(err => {
            console.log(err)
            resolve('error')
         })
   })
}

export default toggleAutoPublish
