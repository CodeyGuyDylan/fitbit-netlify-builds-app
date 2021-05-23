// Views are based on display, not actual different views, this handles changing views
// Kinda ugly? I know

import document from 'document'

import { enableLoadingAnimation } from './enableAnimations'

let loadingPage = document.getElementById('loading')
let successPage = document.getElementById('success')
let errorPage = document.getElementById('error')
let sitesPage = document.getElementById('sites')

export const openLoadingPage = () => {
   enableLoadingAnimation()
   loadingPage.style.display = 'inline'
   successPage.style.display = 'none'
   errorPage.style.display = 'none'
   sitesPage.style.display = 'none'
}

export const openSuccessPage = () => {
   loadingPage.style.display = 'none'
   successPage.style.display = 'inline'
   errorPage.style.display = 'none'
   sitesPage.style.display = 'none'
}

export const openHomePage = () => {
   loadingPage.style.display = 'none'
   successPage.style.display = 'none'
   errorPage.style.display = 'none'
   sitesPage.style.display = 'inline'
}

export const openErrorPage = () => {
   loadingPage.style.display = 'none'
   successPage.style.display = 'none'
   errorPage.style.display = 'inline'
   sitesPage.style.display = 'none'
}
