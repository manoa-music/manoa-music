import { Meteor } from 'meteor/meteor';
import { Profile } from '../../api/profile/Profile';
import { Tags } from '../../api/tags/Tags';

// Initialize the database with a default data document, our Project version.
function addProfile(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName} Profile`);
  Profile.collection.insert(data);
}

function addTags(data) {
  console.log('Tags');
  Tags.collection.insert(data);
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
