/* global localStorage */
import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles'
import 'tachyons'

import theme from './mui-theme/learning-trail-theme'
// import MapView from './map-view/map-view'
// import SignIn from './signin/signin'
// import QrScanner from './qr-scanner/qr-scanner'
// import RoomView from './room-view/room-view'
// import { A2hsProvider } from './context/a2hs-context'
import Home from './scenes/home/home'
import Scan from './scenes/scan/scan'

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
            <Redirect to='/' />
          </Switch>
        {/*<A2hsProvider>*/}
            {/*<Switch>*/}
              {/*<Route exact path='/' component={MapView} />*/}
              {/*<Route exact path='/signin' component={SignIn} />*/}
              {/*<Route exact path='/room/:roomName/desk/:deskId/:action' component={QrScanner} />*/}
              {/*<Route exact path='/reservation/:reservationId/:action' component={QrScanner} />*/}
              {/*<Route path='/room/:roomName' component={RoomView} />*/}
              {/*<Route exact path='/scan' component={QrScanner} />*/}

            {/*</Switch>*/}
        {/*</A2hsProvider>*/}
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
