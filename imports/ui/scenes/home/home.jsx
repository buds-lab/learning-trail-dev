import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { withTracker} from 'meteor/react-meteor-data'

import { TopBar } from 'meteor/buds-shared-meteor-ui'

import { PetNamesCollection } from '../../../api/petnames.js'

const styles = theme => ({
  startButton: {
    borderRadius: '0.5rem',
    paddingTop: '1rem',
    paddingBottom: '1rem'
  }
})

class Home extends Component {


  //TODO: THis function should be called everytime the user scans a QR code or opens up learning trail
  checkPetNames(){
    //Check if there is a petname in the local storage if not take one from the MongoDB
    if(localStorage.petname){
      console.log("welcome " + localStorage.petname)
    }
    else{
      //Take a petname from the MongoDB
      var myName = PetNamesCollection.findOne();
      //need to call an if here to bypass undefined
      if(myName){
        // set local storage
        localStorage.petname = myName.name
        //Remove this instance of the petname from the MongoDB
        Meteor.call('petnames.remove', myName._id)
      }
    }
  }



  render () {
    //Check if petnames exists
    this.checkPetNames()

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
            {/* Sorry Naor, I didn't know how to export default with Styles and with Tracker at the same time*/}
            {/*className={classNames(classes.startButton)}*/}
            <Button
              variant='raised'
              color='primary'
              size='large'
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

//TODO: Get export default with Styles integrated into this
export default withTracker(() => {
  Meteor.subscribe('petnames');
  return {
    petnames: PetNamesCollection.find({}).fetch(),
  };
})(Home)

