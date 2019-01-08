import { Meteor } from 'meteor/meteor'
import React from 'react'
import { render } from 'react-dom'
import _ from 'lodash'

import App from '/imports/ui/app'

Meteor.startup(() => render(<App />, document.querySelector('#app')))

function calcCustomVhVar () {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

window.onload = () => {
  calcCustomVhVar()
}
window.addEventListener('resize', _.throttle(() => {
  calcCustomVhVar()
}, 250))

// Registering service worker
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function () {
//     navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope)
//     }, function(err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err)
//     })
//   })
// }
