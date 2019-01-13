import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import { TopBar } from 'meteor/buds-shared-meteor-ui'

const styles = theme => ({
  startButton: {
    borderRadius: '0.5rem',
    paddingTop: '1rem',
    paddingBottom: '1rem'
  }
})

class Home extends Component {
  render () {
    const { classes } = this.props
    return (
      <div className='open-sans vh-100 flex flex-column items-center relative home-bg'>
        <TopBar title='learning trail' shadowless />
        <div className='w-95 br--bottom br3 overflow-hidden shadow-2 relative ph2 pt2 pb3 white'>
          <div className='absolute top-0 bottom-0 right-0 left-0 o-80 bg-silver z-0' />
          <div className='relative'>
            <div className='f1 fw6 lh-copy'>Hello.</div>
            <div className='f4 mt1'>
              Welcome to Net - Zero Energy Building at the School of Design & Environment.
            </div>
          </div>
        </div>
        <div className='absolute bottom-2 pb3 ph2 w-100 tc z-9999'>
          <Link to='/scan' className='link'>
            <Button
              variant='raised'
              color='primary'
              size='large'
              className={classNames(classes.startButton)}
              fullWidth
            >
              <span className='f4 fw3 open-sans'>Start Exploring</span>
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home)
