/* global localStorage */
import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import 'tachyons'

import theme from './mui-theme/learning-trail-theme'
import Home from './scenes/home/home'
import Scan from './scenes/scan/scan'
import Station from './scenes/station/station'

class App extends Component {
  componentDidMount () {
    if (!Meteor.userId()) {
      let userIdentifier = localStorage.getItem('anonId')
      if (!userIdentifier) {
        userIdentifier = Math.floor(Math.random() * 0xffffffffffffffff).toString(36)
        localStorage.setItem('anonId', userIdentifier)
      }
    }
  }
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/scan' component={Scan} />
            <Route path='/:trailName/:stationName' component={Station} />
            <Redirect to='/' />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
