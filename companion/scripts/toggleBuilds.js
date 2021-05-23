const toggleBuilds = (siteId, access_token, toggle) => {
   // Will activate builds if toggle is false, and deactivate builds if toggle is true
   const reqBody = {
      build_settings: {
         stop_builds: toggle,
      },
   }

   return new Promise(resolve => {
      // Sends http PATCH request to netlify to either activate or deactivate builds
      fetch(`https://api.netlify.com/api/v1/sites/${siteId}`, {
         method: 'PATCH',
         headers: {
            'User-Agent': 'NetlifyBuilds (design@novysolutions.com)',
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(reqBody),
      })
         .then(response => response.json())
         .then(data => {
            if (data.id) {
               console.log(`Builds were successfully toggled ${toggle ? 'off' : 'on'}`)
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

export default toggleBuilds
