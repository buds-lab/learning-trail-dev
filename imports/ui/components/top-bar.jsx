import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const noShadowStyle = {
  boxShadow: 'none'
}

class TopBar extends Component {
  handleBack = () => {
    this.props.history.goBack()
  }
  render () {
    const { showBack, title, shadowless, children } = this.props
    return (
      <AppBar position='static' className='flex-shrink-0' style={shadowless && noShadowStyle}>
        <Toolbar disableGutters>
          {showBack && (
            <IconButton color='inherit' aria-label='Back' onClick={this.handleBack}>
              <ChevronLeftIcon />
            </IconButton>
          )}
          <div className={'flex-grow-1 open-sans white f4 b tc' + (showBack ? ' mr3 pr4' : '')}>
            {title ? title.toUpperCase() : 'LEARNING TRAIL'}
          </div>
        </Toolbar>
        {children}
      </AppBar>
    )
  }
}

TopBar.propTypes = {
  showBack: PropTypes.bool,
  title: PropTypes.string,
  shadowless: PropTypes.bool
}

export default withRouter(TopBar)
