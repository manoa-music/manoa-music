import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SessionCard extends React.Component {

  render() {
    console.log(this.props.session.name);
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {this.props.session.name}
          </Card.Header>
          <Card.Header>Time</Card.Header>
          <Card.Description>
            {this.props.session.time}
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
            {this.props.session.info.map((infos) => `${infos}, `)}
          </Card.Description>
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
    genres: PropTypes.string,
    capabilities: PropTypes.string,
    info: PropTypes.string,
  }).isRequired,
  admin: PropTypes.bool,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(SessionCard);
