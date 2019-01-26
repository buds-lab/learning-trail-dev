import React from 'react'
import PropTypes from 'prop-types'
import { trailsDefs } from '/imports/config/trails'
import { GenericBottomPanel } from 'meteor/buds-shared-meteor-ui'

const StationCharter = ({ punchcards, currTrailName, show, onClose }) => (
  <GenericBottomPanel show={show} onClose={onClose}>
    <div className='pv3 buds-neptune f4 lh-title bw01 bb b--grey-chateau tc fw7 open-sans'>
      Station Charter
    </div>
    <div className='flex mt1 pt3 pb4 mb2 ph2 overflow-auto'>
      {trailsDefs.map(trail => {
        const punchCard = punchcards.find(pc => pc.trailName === trail.name)
        const visitedCount = punchCard ? punchCard.stations.length : 0
        return (
          <div key={trail.name} className='flex flex-column w4 overflow-hidden items-center flex-shrink-0'>
            <div
              className={
                'br-100 w3 h3 flex items-center justify-center f4 ' +
                (trail.name === currTrailName
                  ? 'bg-buds-yolk white glow-shadow-1'
                  : 'ba b--moon-gray bw01 moon-gray'
                )
              }
            >
              {visitedCount}/{trail.stations.length}
            </div>
            <div className='f6 gray mt2'>
              {trail.name}
            </div>
          </div>
        )
      })}
    </div>
  </GenericBottomPanel>
)

StationCharter.propTypes = {
  punchcards: PropTypes.array.isRequired,
  currTrailName: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default StationCharter
