import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { trailsDefs } from '/imports/config/trails'
import { snakeCase } from '/imports/util/formatters'
import { GenericBottomPanel } from 'meteor/buds-shared-meteor-ui'

const StationCharter = ({ punchcards, currTrailName, show, onClose, history }) => (
  <GenericBottomPanel show={show} onClose={onClose}>
    <div className='pv3 gray f4 lh-title bw01 bb b--grey-chateau tc fw7 open-sans'>
      Station Charter
    </div>
    <div className='gray f7 bw01 b--grey-chateau tc fw7 open-sans'>
      Your Anonymous ID is: {localStorage.getItem('anonId')}
    </div>
    <div className='flex mt1 pt3 pb4 mb2 ph2 overflow-auto'>
      {trailsDefs.map(trail => {
        const punchCard = punchcards.find(pc => pc.trailName === trail.name)
        const visitedCount = punchCard ? punchCard.stations.length : 0
        return (
          <div key={trail.name} className='flex flex-column w4 overflow-hidden items-center flex-shrink-0'>
            <div
              onClick={() => history.push(`/${snakeCase(trail.name)}/${snakeCase(trail.stations[0].name)}/trail`)}
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
  onClose: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(StationCharter)
