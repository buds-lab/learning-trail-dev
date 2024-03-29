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
import ButtonBase from '@material-ui/core/ButtonBase'
import { SiteTabbedLayout, InfoTab, FeedbackPanel } from 'meteor/buds-shared-meteor-ui'
import { trailsDefs, stationFeedbackMap } from '/imports/config/trails'
import StationPunchcards, { collectionName } from '/imports/api/station-punchcards'
import { romanize, desnakeCase, snakeCase } from '/imports/util/formatters'
import StationCharter from '../../components/station-charter'
import EnergyChart from "../../visualisations/energy.js"
import LocationFinder from '../../components/location-finder'

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

const StationCard = ({ trailDef, stationIndex, wasVisited, onClick }) => {
  const stationSlug = snakeCase(trailDef.stations[stationIndex].name)
  return (
    <div className='mt2 relative flex items-stretch flex-shrink-0'>
      <div className='fl w-10 flex justify-center relative'>
        <div className='bl b--moon-gray' />
      </div>
      <div className='fl w-80 pv1'>
        <div className='br4 cust-shadow-3 relative overflow-hidden'>
          <ButtonBase onClick={onClick}>
            <div className='tl pb4'>
              <div className='pt2 pl3 pr1'>
                <div className='moon-gray f7 fw6 lh-copy'>
                  STATION {romanize(stationIndex + 1)}
                </div>
                <div className='gray f6 fw6 lh-copy'>
                  {trailDef.stations[stationIndex].name}
                </div>
              </div>
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
          </ButtonBase>
        </div>
      </div>
    </div>
  )
}

StationCard.propTypes = {
  trailDef: PropTypes.object.isRequired,
  stationIndex: PropTypes.number.isRequired,
  wasVisited: PropTypes.bool.isRequired,
  onClick: PropTypes.func
}

class Station extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      doShowFeedback: false,
      visiblePopPanel: null,
      finderStationIdx: 0
    }
  }

  componentDidMount () {
    const { trailName, stationName } = this.props.match.params

    //check for local storage of feedback groups
    this.taggedFeedbackGroups = localStorage.getItem('feedbackGroups') ? JSON.parse(localStorage.getItem('feedbackGroups')) : []
    this.feedbackGroupName = stationFeedbackMap[`${desnakeCase(trailName)}/${desnakeCase(stationName)}`]
    
    // if feedback for the current QR code location has not been obtained
    if(!this.taggedFeedbackGroups.includes(this.feedbackGroupName)) {

      setTimeout(() => {
        this.setState({
          doShowFeedback: true
        })
      }, 1e4)
    }

    setTimeout(() => {
      const userIdentifier = localStorage.getItem('anonId')
      Meteor.call(`${collectionName}.checkIn`, userIdentifier, desnakeCase(trailName), desnakeCase(stationName), err => {
        if (err) {
          console.error('Could not check in to station', err.error)
        }
      })
    }, 500)
  }
  
  handleFeedbackDone = () => {
    this.setState({ doShowFeedback: false })
    
    // Only "tagging" the current group after the user actively submitted feedback
    this.taggedFeedbackGroups.push(this.feedbackGroupName)
    localStorage.setItem('feedbackGroups', JSON.stringify(this.taggedFeedbackGroups))
  }
  
  showCharter = (doShow) => () => {
    setTimeout(() => {
      this.setState({
        visiblePopPanel: doShow ? 'charter' : null
      })
    }, 200)
  }



  renderContent() {
    const { match, history, punchcards } = this.props
    const { trailName, stationName } = match.params
    // TODO: Make this a list to add new visualisations in the future
    if(stationName === "NET_ZERO_ENERGY_TRAIL" && trailName ==="NET_ZERO_ENERGY_TRAIL"){
      return(
        <EnergyChart key = {1} />
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
    const { doShowFeedback, visiblePopPanel, finderStationIdx } = this.state
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
                  <WaypointCircle key={'waypoint ' + index} isActive={thisStation.name === stationNameDesnaked} />,
                  <StationCard
                    key={'card ' + index}
                    trailDef={trailDef}
                    stationIndex={index}
                    wasVisited={checkedStations.includes(thisStation.name)}
                    onClick={() => this.setState({
                      visiblePopPanel: 'finder',
                      finderStationIdx: index
                    })}
                  />
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
          show={visiblePopPanel === 'charter' && !doShowFeedback}
          punchcards={punchcards}
          currTrailName={trailNameDesnaked}
          onClose={this.showCharter(false)}
        />
        <LocationFinder
          show={visiblePopPanel === 'finder' && !doShowFeedback}
          onClose={() => {
            setTimeout(() => {
              this.setState({ visiblePopPanel: null })
            }, 200)
          }}
          trailDef={trailDef}
          stationIndex={finderStationIdx}
        />
        <FeedbackPanel
          roomName={`${trailName}->${stationName}`}
          doShowFeedback={doShowFeedback}
          onFeedbackDone={this.handleFeedbackDone}
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
