import { Meteor } from 'meteor/meteor';
import '/imports/api/station-punchcards'
import Influx from 'influx';

//import pet name list
import petnames from './petnames.json'

//importing collections
import {PetNamesCollection} from '../imports/api/petnames.js'




Meteor.startup(() => {
  // code to run on server at startup
    console.log("meteor server started")
    // If MongoDatabase of Petnames Exists?
    if (PetNamesCollection.findOne()){
      console.log("PetNamesCollection Database Exists")
      console.log(PetNamesCollection.findOne())
    }
    else {
      //Populate a database of petnames from petnames.json
      console.log("petnames database doesn't exist")
      console.log("adding" + petnames)
      petnames.map((petname) => PetNamesCollection.insert({name: petname}))
    }
});

// Option 2: We create a method that can be called by the client side
// This allows us to querry the InfluxDB from the client, while keeping all credentials on the server side
Meteor.methods({
	callInflux(queryMessage){

		// to prevent requests from queing up. MIght not be required
		this.unblock()

		INFLUX_HOST= Meteor.settings.influx.host;
		INFLUX_USER= Meteor.settings.influx.user;
		INFLUX_PW= Meteor.settings.influx.password;
		INFLUX_DB= Meteor.settings.influx.database;

	 // Create Client
    const influx = new Influx.InfluxDB({
      database: INFLUX_DB,
      username: INFLUX_USER,
      password: INFLUX_PW,
      protocol: "https",
      host: INFLUX_HOST,
      port: 8086
    	})

    // Amzing Tutorial Here Explaining This 
    // https://blog.meteor.com/using-promises-and-async-await-in-meteor-8f6f4a04f998
    // we need to return the promise to the client, along with the result for it to render
    let myquery = influx.query(queryMessage)
    	.then(result => {
    		console.log(result);
    		return result
    	})
    return myquery
	},

  writeInflux(petname, location, comfortResponse){

    // to prevent requests from queing up. MIght not be required
    this.unblock()

    INFLUX_HOST= Meteor.settings.influx.host;
    INFLUX_USER= Meteor.settings.influx.user;
    INFLUX_PW= Meteor.settings.influx.password;
    INFLUX_DB= Meteor.settings.influx.database;

    // Create Client
      const influx = new Influx.InfluxDB({
        database: INFLUX_DB,
        username: INFLUX_USER,
        password: INFLUX_PW,
        protocol: "https",
        host: INFLUX_HOST,
        port: 8086
        })

      //TODO: Set fields correctly depending on how data is obtained and desired
      //NOTE: The code below is dummy code that has not been tested
      //NOTE: PJ can't remember exactly how we defined the database to be so this may be wrong
      influx.writePoints([{
        measurement: 'learning_trail',
        tags: {user_id: petname, location: location},
        fields: {thermal_comfort: comfortResponse.thermal, light_comfort: comfortResponse.light, noise_comfort: comfortResponse.noise},
          }
        ])
  }
})
