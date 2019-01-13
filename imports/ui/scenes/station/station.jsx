import React, { Component } from 'react'
import InfoOutlineIcon from '@material-ui/icons/InfoOutlined'
import NearMeIcon from '@material-ui/icons/NearMe'
import CropFreeIcon from '@material-ui/icons/CropFree'
import Button from '@material-ui/core/Button'
import { SiteTabbedLayout, InfoTab } from 'meteor/buds-shared-meteor-ui'

class Station extends Component {
  render () {
    const { match, history } = this.props
    const { trailName, stationName } = match.params
    return (
      <SiteTabbedLayout
        title={trailName.split('_').join(' ')}
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
              <div key={2} className='flex-grow-1 flex flex-column pt2 pl4 bg-white'>
                <div className='flex'>
                  <div className='ml3 flex flex-column w2 items-center'>
                    <div className='bl b--moon-gray'>
                      <div className='h2' />
                      <div className='h1' />
                    </div>
                    <div className='mt2 br-100 bg-buds-yolk dib'>
                      <div className='h1 w1 ba b--transparent bw1 content-box' />
                    </div>
                  </div>
                </div>
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
      </SiteTabbedLayout>
    )
  }
}

export default Station
