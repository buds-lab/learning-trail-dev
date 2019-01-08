import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { QrScanner } from 'meteor/buds-shared-meteor-ui'
import TopBar from '/imports/ui/components/top-bar'

export default class Scan extends Component {
  render () {
    return (
      <div className='bg-buds-neptune open-sans vh-100 open-sans flex flex-column'>
        <TopBar showBack shadowless />
        <QrScanner
          onScan={url => this.props.history.push(url)}
          urlMatcher={content => content.match(new RegExp(`.*${window.location.host}(\/room\/.+)`))}
          instruction='Scan QR Code'
        />
      </div>
    )
  }
}
