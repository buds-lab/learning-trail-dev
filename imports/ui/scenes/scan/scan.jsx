/* global localStorage */
import React, { Component } from 'react'
import { QrScanner, TopBar } from 'meteor/buds-shared-meteor-ui'

export default class Scan extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      error: null
    }
  }
  handleScan = url => {
    this.props.history.push(url)
  }
  trailUrlMatcher = content => content.match(new RegExp(`^.*${window.location.host}(\/[A-Z0-9_]+\/[A-Z0-9_]+)$`))
  render () {
    return (
      <div className='bg-buds-neptune open-sans vh-100 open-sans flex flex-column'>
        <TopBar title='learning trail' showBack shadowless />
        <QrScanner
          onScan={this.handleScan}
          urlMatcher={this.trailUrlMatcher}
          instruction='Scan QR Code'
        />
      </div>
    )
  }
}
