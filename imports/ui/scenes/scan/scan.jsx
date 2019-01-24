/* global localStorage */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { QrScanner, TopBar } from 'meteor/buds-shared-meteor-ui'
import { Meteor } from 'meteor/meteor'
import { collectionName } from '/imports/api/station-punchcards'

const desnakeCase = str => str.split('_').join(' ')
export default class Scan extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      error: null
    }
  }
  handleScan = url => {
    const userIdentifier = localStorage.getItem('anonId')
    const [ fullMatch, trailName, stationName ] = url.match(/\/([A-Z_]+)\/([A-Z_]+)$/)
    Meteor.call(`${collectionName}.checkIn`, userIdentifier, desnakeCase(trailName), desnakeCase(stationName), err => {
      if (err) {
        this.setState({
          error: err.error
        })
        setTimeout(() => {
          this.setState({
            error: null
          })
        }, 3500)
      } else {
        this.props.history.push(url)
      }
    })
  }
  trailUrlMatcher = content => content.match(new RegExp(`^.*${window.location.host}(\/[A-Z_]+\/[A-Z_]+)$`))
  render () {
    const { error } = this.state
    return (
      <div className='bg-buds-neptune open-sans vh-100 open-sans flex flex-column'>
        <TopBar title='learning trail' showBack shadowless />
        <QrScanner
          onScan={this.handleScan}
          urlMatcher={this.trailUrlMatcher}
          instruction='Scan QR Code'
        />
        {error && (
          <div className='absolute bottom-0 left-0 right-0 tc'>
            <div className='dib w-95 br3 br--top bg-red white cust-shadow-up-1 tc pv3'>
              {error}
            </div>
          </div>
        )}
      </div>
    )
  }
}
