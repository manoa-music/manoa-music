import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Sessions } from '../../api/session/Session';
import SessionCard from '../components/SessionCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListJamSessions extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container id="list-jam-sessions-page">
        <Header as="h2" textAlign="center">List Jam Sessions</Header>
        <Card.Group>
          {this.props.sessions.map((session, index) => <SessionCard key={index} session={session} Sessions={Sessions} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListJamSessions.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Sessions.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const sessions = Sessions.collection.find({}).fetch();
  return {
    sessions,
    ready,
  };
})(ListJamSessions);
