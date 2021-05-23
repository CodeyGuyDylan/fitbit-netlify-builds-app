import document from 'document'

// Manually enables animations
export const enableLoadingAnimation = () => {
   var loadingIcon = document.getElementById('loadingAnimation')
   loadingIcon.animate('enable')
}
