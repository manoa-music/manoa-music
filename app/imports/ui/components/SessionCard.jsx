import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SessionCard extends React.Component {

  deleteSession = (docID) => {
    console.log(`item to delete: ${docID}`);
    this.props.Sessions.collection.remove(docID);
  }

  render() {
    console.log(this.props.session.name);
    return (
      <Card id="list-jam-sessions-page">
        <Card.Content>
          <Card.Header>
            {this.props.session.name}
          </Card.Header>
          <Card.Header>Time</Card.Header>
          <Card.Description>
            {this.props.session.dateMonth}/{this.props.session.dateDay},{this.props.session.time}{this.props.session.period}
          </Card.Description>
          <Card.Header>Location</Card.Header>
          <Card.Description>
            {this.props.session.location}
          </Card.Description>
          <Card.Header>Genres</Card.Header>
          <Card.Description>
            {this.props.session.genres}
          </Card.Description>
          <Card.Header>Capabilities</Card.Header>
          <Card.Description>
            {this.props.session.capabilities}
          </Card.Description>
          <Card.Header>Organization Info</Card.Header>
          <Card.Description>
            {this.props.session.info}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button id="listJam-delete" onClick={() => this.deleteSession(this.props.session._id)}>Delete</Button>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
SessionCard.propTypes = {
  session: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    time: PropTypes.string,
    period: PropTypes.array,
    dateMonth: PropTypes.array,
    dateDay: PropTypes.array,
    genres: PropTypes.string,
    capabilities: PropTypes.string,
    info: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  Sessions: PropTypes.object.isRequired,
  admin: PropTypes.bool,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(SessionCard);
