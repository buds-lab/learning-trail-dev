import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GenericBottomPanel } from 'meteor/buds-shared-meteor-ui'
import { romanize, snakeCase } from '/imports/util/formatters'

export default class LocationFinder extends Component {
  render () {
    const { show, onClose, stationIndex, trailDef } = this.props
    const stationDef = trailDef.stations[stationIndex]
    return (
      <GenericBottomPanel {...{ show, onClose }}>
        <div className='pv3 gray f4 lh-title bw01 bb b--grey-chateau tc fw7 open-sans'>
          Station {romanize(stationIndex + 1)} Location
        </div>
        <div className='flex flex-column items-center mt1'>
          <div className='tc f6 gray w-70 lh-title'>
            {stationDef.location}
          </div>
          <img
            className='w-70 mt1'
            src={`/assets/trails/${snakeCase(trailDef.name)}/${snakeCase(stationDef.name)}/location-finder.jpg`}
          />
        </div>
      </GenericBottomPanel>
    )
  }
}

LocationFinder.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  trailDef: PropTypes.object.isRequired,
  stationIndex: PropTypes.number
}
