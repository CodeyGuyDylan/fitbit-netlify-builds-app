const NetlifyBuildSettings = props => {
   return (
      <Page>
         <TextInput
            label='Netlify Personal Access Token'
            settingsKey='access_token'
            action='Update Token'
         />
      </Page>
   )
}

registerSettingsPage(NetlifyBuildSettings)
