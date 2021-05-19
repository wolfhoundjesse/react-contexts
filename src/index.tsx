import React from 'react'
import ReactDom from 'react-dom'
import App from './app/app'
import * as serviceWorker from './serviceWorker'
import AppProvider from './app/app-provider'

/**
 * Accessibility Testing with react-axe
 *
 * Uncomment the code block below to enable react-axe for the development environment.
 * Documentation: https://github.com/dequelabs/react-axe
 */
// if (process.env.NODE_ENV === 'development') {
//   let axe = require('react-axe')
//   axe(React, ReactDom, 1000)
// }

ReactDom.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
