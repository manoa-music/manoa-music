import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff';
import { Profile } from '../../api/profile/Profile';
import { Tags } from '../../api/tags/Tags';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the database with a default data document, our Project version.
function addProfile(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName} Profile`);
  Profile.collection.insert(data);
}

function addTags(data) {
  console.log('Tags');
  Tags.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the ProfilesCollection if empty.
if (Profile.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
}

// Initialize the TagsCollection if empty.
if (Tags.collection.find().count() === 0) {
  if (Meteor.settings.defaultTags) {
    console.log('Creating default tag.');
    Meteor.settings.defaultTags.map(data => addTags(data));
  }
}

