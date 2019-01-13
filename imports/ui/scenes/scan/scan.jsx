import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { QrScanner, TopBar } from 'meteor/buds-shared-meteor-ui'

export default class Scan extends Component {
  render () {
    return (
      <div className='bg-buds-neptune open-sans vh-100 open-sans flex flex-column'>
        <TopBar title='learning trail' showBack shadowless />
        <QrScanner
          onScan={url => this.props.history.push(url)}
          urlMatcher={content => content.match(new RegExp(`.*${window.location.host}(\/room\/.+)`))}
          instruction='Scan QR Code'
        />
      </div>
    )
  }
}
