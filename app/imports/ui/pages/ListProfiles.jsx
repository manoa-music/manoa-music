import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ProfileComp from '../components/ProfileComp';
import { Profile } from '../../api/profile/Profile';
import { Reviews } from '../../api/review/Review';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListProfiles extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id="list-profiles-page">
        <Header as="h2" textAlign="center">List Profile</Header>
        <Card.Group>
          {this.props.profiles.map((profile, index) => <ProfileComp
            key={index}
            profile={profile}
            reviews={this.props.reviews.filter(review => (review.contactId === profile._id))} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListProfiles.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  reviews: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Review
  const reviewsSubscription = Meteor.subscribe(Reviews.userPublicationName);
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profile.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && reviewsSubscription.ready();
  // Get the Stuff documents
  const profiles = Profile.collection.find({}).fetch();
  const reviews = Reviews.collection.find({}).fetch();
  return {
    profiles,
    reviews,
    ready,
  };
})(ListProfiles);
