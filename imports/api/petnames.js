import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'




// Setting up the DB
export const PetNamesCollection = new Mongo.Collection('petnames');


// Allow us to access the database in the apps
if (Meteor.isServer) {
	Meteor.publish('petnames', function petNamesPublication(){
		return PetNamesCollection.find();
	});
}

//Remove the petname from the MongoDB
Meteor.methods({
	'petnames.remove'(petnameId){
		check(petnameId, String);
		PetNamesCollection.remove(petnameId)
	}
})