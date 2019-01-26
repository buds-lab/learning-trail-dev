/* global localStorage */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import InfoOutlineIcon from '@material-ui/icons/InfoOutlined'
import NearMeIcon from '@material-ui/icons/NearMe'
import CropFreeIcon from '@material-ui/icons/CropFree'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import BeenhereIcon from '@material-ui/icons/BeenhereOutlined'
import Button from '@material-ui/core/Button'
import { SiteTabbedLayout, InfoTab, FeedbackPanel } from 'meteor/buds-shared-meteor-ui'
import { trailsDefs } from '/imports/config/trails'
import StationPunchcards, { collectionName } from '/imports/api/station-punchcards'
import { romanize } from '/imports/util/formatters'
import StationCharter from '../../components/station-charter'

import EnergyChart from "../../visualisations/energy.js"


const snakeCase = str => str.split(' ').join('_')
const desnakeCase = str => str.split('_').join(' ')

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

const StationCard = ({ trailDef, stationIndex, wasVisited }) => {
  const stationSlug = snakeCase(trailDef.stations[stationIndex])

  return (
    <div className='mt2 relative flex items-stretch flex-shrink-0'>
      <div className='fl w-10 flex justify-center relative'>
        <div className='bl b--moon-gray' />
      </div>
      <div className='fl w-80 pv1'>
        <div className='br4 cust-shadow-3 pb4 relative'>
          <div className='pt2 pl3 pr1'>
            <div className='moon-gray f7 fw6 lh-copy'>
              STATION {romanize(stationIndex + 1)}
            </div>
            <div className='gray f6 fw6 lh-copy'>
              {trailDef.stations[stationIndex]}
            </div>
          </div>
          {/*<img className='w-100 mb3' src='/home-bg.jpg' />*/}
          <img className='w-100 mb3' src={`/assets/trails/${snakeCase(trailDef.name)}/${stationSlug}/${stationSlug}.jpg`} />
          <div
            className={
              'absolute w2 h2 bottom-2 right-1 br-100 ba content-box cust-shadow-3 flex items-center justify-center ' +
              (wasVisited ? 'bg-buds-yolk b--buds-yolk' : 'bg-white bw1 b--gray')
            }
          >
            {wasVisited ? (
              <CheckIcon nativeColor='white' />
            ) : (
              <CloseIcon nativeColor='#777' />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

class Station extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      doShowFeedback: false,
      doShowCharter: false
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        doShowFeedback: true
      })
    }, 1e4)

    setTimeout(() => {
      const userIdentifier = localStorage.getItem('anonId')
      const { trailName, stationName } = this.props.match.params
      Meteor.call(`${collectionName}.checkIn`, userIdentifier, desnakeCase(trailName), desnakeCase(stationName), err => {
        if (err) {
          console.error('Could not check in to station', err.error)
        }
      })
    }, 500)
  }
  showCharter = (doShow) => () => {
    setTimeout(() => {
      this.setState({
        doShowCharter: doShow
      })
    }, 200)
  }



  renderContent() {
    const { match, history, punchcards } = this.props
    const { trailName, stationName } = match.params
    //<iframe key = {1} height = "400" src = "http://www.budslab.org/visual-analytics-project/"> </iframe>

    if(true){
      return(
        <EnergyChart key = {1} onScroll={console.log("Energy chart element scrolling")} />
        
        )

    }
    else {
      return(
      <InfoTab key={1} contentUrl={`/assets/trails/${trailName}/${stationName}/${stationName}.html`} />
      )
    }

    

  }

  render () {
    const { match, history, punchcards } = this.props
    const { trailName, stationName } = match.params
    const { doShowFeedback, doShowCharter } = this.state
    const trailNameDesnaked = desnakeCase(trailName)
    const stationNameDesnaked = desnakeCase(stationName)
    const trailDef = trailsDefs.find(def => def.name === trailNameDesnaked)
    if (!trailDef) return <Redirect to='/scan' />
    const currPunchcard = punchcards.find(pc => pc.trailName === trailNameDesnaked)
    const checkedStations = currPunchcard ? currPunchcard.stations : []
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
              this.renderContent()
            )
          },
          {
            name: 'trail',
            label: 'TRAIL',
            iconEl: <NearMeIcon />,
            tabEl: (
              <div key={2} className='flex flex-column pt2 pl4 bg-white overflow-auto pb7' >
                <LeadingLine />
                {_.flatten(trailDef.stations.map((thisStation, index) => [
                  <WaypointCircle key={'waypoint ' + index} isActive={thisStation === stationNameDesnaked} />,
                  <StationCard key={'card ' + index} trailDef={trailDef} stationIndex={index} wasVisited={checkedStations.includes(thisStation)} />
                ]))}
                <WaypointCircle isEnd />
              </div>
            )
          }
        ]}
      >
        <div className='absolute right-1 bottom-2 flex flex-column items-center'>
          <Button variant='fab' mini style={{backgroundColor: 'white'}} onClick={this.showCharter(true)}>
            <BeenhereIcon nativeColor='var(--buds-neptune)' />
          </Button>
          <div className='mt4'>
            <Button variant='fab' color='primary' aria-label='scan' onClick={() => history.push('/scan')}>
              <CropFreeIcon />
            </Button>
          </div>
        </div>
        <StationCharter
          show={doShowCharter && !doShowFeedback}
          punchcards={punchcards}
          currTrailName={trailNameDesnaked}
          onClose={this.showCharter(false)}
        />
        <FeedbackPanel
          roomName={`${trailName}->${stationName}`}
          doShowFeedback={doShowFeedback}
          onFeedbackDone={() => this.setState({ doShowFeedback: false })}
        />
      </SiteTabbedLayout>
    )
  }
}

Station.propTypes = {
  punchcards: PropTypes.array
}

export default withTracker(() => {
  Meteor.subscribe(`${collectionName}.myPunchcards`, localStorage.getItem('anonId'))
  return {
    punchcards: StationPunchcards.find().fetch()
  }
})(Station)
