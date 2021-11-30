import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Item } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { _ } from 'meteor/underscore';
import ProfileComment from '../components/ProfileComment';
import { Profiles } from '../../api/profile/Profiles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const data = Profiles.collection.find().fetch();
    console.log(this.props.doc);
    return (
      <Container>
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
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const profiles = Profiles.collection.find({}).fetch();
  // Added match into withTracker
  const documentId = match.params._id;
  const doc = Profiles.collection.findOne(documentId);
  return {
    profiles,
    doc,
    ready,
  };
})(UserProfile);
