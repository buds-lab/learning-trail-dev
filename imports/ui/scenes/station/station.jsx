import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import InfoOutlineIcon from '@material-ui/icons/InfoOutlined'
import NearMeIcon from '@material-ui/icons/NearMe'
import CropFreeIcon from '@material-ui/icons/CropFree'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import { SiteTabbedLayout, InfoTab, FeedbackPanel } from 'meteor/buds-shared-meteor-ui'
import { trailsDefs } from '/imports/config/trails'

// from: https://stackoverflow.com/questions/9083037/convert-a-number-into-a-roman-numeral-in-javascript
function romanize (num) {
  if (isNaN(num)) return NaN
  const digits = String(+num).split('')
  const key = [
    '', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM', '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX',
    'LXXX', 'XC', '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'
  ]
  let roman = ''
  let i = 3
  while (i--) roman = (key[+digits.pop() + (i * 10)] || '') + roman
  return Array(+digits.join('') + 1).join('M') + roman
}

const snakeCase = str => str.split(' ').join('_')

const LeadingLine = () => (
  <div className='flex-shrink-0'>
    <div className='fl w-10 flex justify-center'>
      <div className='bl b--moon-gray'>
        <div className='h2' />
        <div className='h1' />
      </div>
    </div>
  </div>
)

const WaypointCircle = ({ isActive, isEnd }) => (
  <div className='mt2 flex-shrink-0'>
    <div className='fl w-10 flex justify-center'>
      <div
        className={
          'dib h1 w1 ba br-100 bw1 content-box ' +
          (isEnd ? 'bg-buds-neptune b--buds-neptune' : isActive ? 'bg-buds-yolk b--buds-yolk' : 'b--buds-neptune')
        }
      />
    </div>
  </div>
)
WaypointCircle.propTypes = {
  isActive: PropTypes.bool,
  isEnd: PropTypes.bool
}

const StationCard = ({ trailDef, stationIndex, wasVisited }) => (
  <div className='mt2 relative flex items-stretch flex-shrink-0'>
    <div className='fl w-10 flex justify-center relative'>
      <div className='bl b--moon-gray' />
    </div>
    <div className='fl w-80 pv1'>
      <div className='br4 cust-shadow-3 pb4 relative'>
        <div className='pt2 pl3 pr1'>
          <div className='buds-neptune f7 fw6 lh-copy'>
            STATION {romanize(stationIndex + 1)}
          </div>
          <div className='gray f6 fw6 lh-copy'>
            {trailDef.stations[stationIndex]}
          </div>
        </div>
        {/*<img className='w-100 mb3' src='/home-bg.jpg' />*/}
        <img className='w-100 mb3' src={`/assets/trails/${snakeCase(trailDef.name)}/${snakeCase(trailDef.stations[stationIndex])}.jpg`} />
        <div
          className={
            'absolute w2 h2 bottom-2 right-1 br-100 ba content-box cust-shadow-3 flex items-center justify-center ' +
            (wasVisited ? 'bg-buds-yolk b--buds-yolk' : 'bg-white bw1 b--buds-neptune')
          }
        >
          {wasVisited ? (
            <CheckIcon nativeColor='white' />
          ) : (
            <CloseIcon nativeColor='var(--buds-neptune)' />
          )}
        </div>
      </div>
    </div>
  </div>
)

class Station extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      doShowFeedback: false
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        doShowFeedback: true
      })
    }, 1e4)
  }
  render () {
    const { match, history } = this.props
    const { trailName, stationName } = match.params
    const { doShowFeedback } = this.state
    const trailDef = trailsDefs.find(def => def.name === trailName.split('_').join(' '))
    return (
      <SiteTabbedLayout
        title={trailDef.name}
        baseUrl={match.url}
        tabDefs={[
          {
            name: '',
            label: 'STATION',
            iconEl: <InfoOutlineIcon />,
            tabEl: (
              <InfoTab key={1} contentUrl={`/assets/trails/${trailName}/${stationName}.html`} />
            )
          },
          {
            name: 'trail',
            label: 'TRAIL',
            iconEl: <NearMeIcon />,
            tabEl: (
              <div key={2} className='flex flex-column pt2 pl4 bg-white overflow-auto pb4'>
                <LeadingLine />
                {_.flatten(trailDef.stations.map((stationName, index) => [
                  <WaypointCircle key={'waypoint ' + index} isActive={index === 0} />,
                  <StationCard key={'card '+ index} trailDef={trailDef} stationIndex={index} wasVisited={index === 0} />
                ]))}
                <WaypointCircle isEnd />
              </div>
            )
          }
        ]}
      >
        <div className='absolute right-1 bottom-2'>
          <Button variant='fab' color='primary' aria-label='scan' onClick={() => history.push('/scan')}>
            <CropFreeIcon />
          </Button>
        </div>
        <FeedbackPanel
          roomName={stationName}
          doShowFeedback={doShowFeedback}
          onFeedbackDone={() => this.setState({ doShowFeedback: false })}
        />
      </SiteTabbedLayout>
    )
  }
}

export default Station
