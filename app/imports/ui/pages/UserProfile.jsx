import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Item } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { _ } from 'meteor/underscore';
import ProfileComment from '../components/ProfileComment';
import { Profile } from '../../api/profile/Profile';
import { Reviews } from '../../api/review/Review';

class UserProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    // const data = this.props.profiles.map((profile, index) => <ProfileComment key={index} profile={profile}/>);
    // console.log(data);
    return (
      <Container id="user-profile-page">
        <Header as="h2" textAlign="center">User Profile</Header>
        <Item.Group model={this.props.doc}>
          <ProfileComment
            profile={this.props.doc}
            reviews={this.props.reviews.filter(review => (review.contactId === this.props.doc._id))} />
        </Item.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  doc: PropTypes.object,
  // profiles: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const reviewsSubscription = Meteor.subscribe(Reviews.userPublicationName);
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profile.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && reviewsSubscription.ready();
  // Get the Stuff documents
  const profiles = Profile.collection.find({}).fetch();
  // Added match into withTracker
  const documentId = match.params._id;
  const doc = Profile.collection.findOne(documentId);
  const reviews = Reviews.collection.find({}).fetch();
  return {
    profiles,
    reviews,
    doc,
    ready,
  };
})(UserProfile);
