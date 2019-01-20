import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import { trailsDefs } from '/imports/config/trails'

export const collectionName = 'stationPunchcards'

const StationPunchcards = new Mongo.Collection(collectionName)

if (Meteor.isServer) {
  Meteor.publish(`${collectionName}.myPunchcards`, function (userIdentifier) {
    if (!userIdentifier) {
      this.ready()
      // this.error(new Meteor.Error({message: 'A user identifier string is required'}))
      return
    }
    return StationPunchcards.find({userIdentifier})
  })
}

Meteor.methods({
  [`${collectionName}.checkIn`] (userIdentifier, trailName, stationName) {
    check(userIdentifier, String)
    check(trailName, String)
    check(stationName, String)

    const trailDef = trailsDefs.find(def => def.name === trailName)
    if (!trailName) {
      throw new Meteor.Error('The trail name doesn\'t match')
    }
    if (!trailDef.stations.includes(stationName)) {
      throw new Meteor.Error('The station name doesn\'t match, or missing from the specified trail')
    }

    const stationIndex = trailDef.stations.indexOf(stationName)
    const existingPunchcard = StationPunchcards.findOne({ userIdentifier, trailName })
    if (existingPunchcard) {
      if (stationIndex !== 0 && !existingPunchcard.stations.includes(trailDef.stations[stationIndex - 1])) {
        throw new Meteor.Error(`Must check in to the stations in the correct order, ${trailDef.stations[stationIndex - 1]} is before the current one`)
      }
      if (existingPunchcard.stations.includes(stationName)) {
        console.log(`${userIdentifier} already checked in to ${stationName}`)
      } else {
        StationPunchcards.update({_id: existingPunchcard._id}, {
          $push: {
            stations: stationName
          }
        })
      }
    } else {
      if (stationIndex !== 0) throw new Meteor.Error(`Must start the ${trailName} with the first station: ${trailDef.stations[0]}`)
      StationPunchcards.insert({
        userIdentifier,
        trailName,
        stations: [
          stationName
        ]
      })
    }
  }
})

export default StationPunchcards
