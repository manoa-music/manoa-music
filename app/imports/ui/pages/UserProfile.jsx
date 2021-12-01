import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Item } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { _ } from 'meteor/underscore';
import ProfileComment from '../components/ProfileComment';
import { Profile } from '../../api/profile/Profile';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const data = Profile.collection.find().fetch();
    console.log(this.props.doc);
    return (
      <Container id="user-profile-page">
        <Header as="h2" textAlign="center" inverted>User Profile</Header>
        <Item.Group model={this.props.doc}>
          <ProfileComment profile={data}/>
        </Item.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
UserProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  doc: PropTypes.object,
  // profiles: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profile.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const profiles = Profile.collection.find({}).fetch();
  // Added match into withTracker
  const documentId = match.params._id;
  const doc = Profile.collection.findOne(documentId);
  return {
    profiles,
    doc,
    ready,
  };
})(UserProfile);
