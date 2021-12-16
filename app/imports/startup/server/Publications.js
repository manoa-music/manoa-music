import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Profile } from '../../api/profile/Profile';
import { Tags } from '../../api/tags/Tags';
import { Reviews } from '../../api/review/Review';
import { Sessions } from '../../api/session/Session';


// Publish Review
Meteor.publish(Reviews.userPublicationName, function () {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username;
    return Reviews.collection.find();
  }
  return this.ready();
});

// Publish Profile
Meteor.publish(Profile.userPublicationName, function () {
  if (this.userId) {
    return Profile.collection.find();
  }
  return this.ready();
});

Meteor.publish(Profile.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profile.collection.find();
  }
  return this.ready();
});

// Publish Tags
Meteor.publish(Tags.userPublicationName, function () {
  if (this.userId) {
    return Tags.collection.find();
  }
  return this.ready();
});

Meteor.publish(Sessions.userPublicationName, function () {
  if (this.userId) {
    return Sessions.collection.find();
  }
  return this.ready();
});
// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
