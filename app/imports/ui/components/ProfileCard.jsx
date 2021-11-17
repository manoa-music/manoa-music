import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileCard extends React.Component {
  editExtra(admin) {
    if (admin) {
      return (
        <Card.Content extra>
          <Link>Edit</Link>
        </Card.Content>
      );
    }
    return (<div></div>);
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Image src='../images/meteor-logo.png'/>
          <Card.Header>
            {this.props.profile.firstName} {this.props.profile.lastName}
          </Card.Header>
          <Card.Header>Instruments</Card.Header>
          <Card.Description>
            {this.props.profile.instruments.map((instrument) => `${instrument}, `)}
          </Card.Description>
          <Card.Header>Genre/Tastes</Card.Header>
          <Card.Description>
            {this.props.profile.tastes.map((taste) => `${taste}, `)}
          </Card.Description>
          <Card.Header>Goals</Card.Header>
          <Card.Description>
            {this.props.profile.goals.map((goal) => `${goal}, `)}
          </Card.Description>
          <Card.Header>Capabilities</Card.Header>
          <Card.Description>
            {this.props.profile.capabilities.map((capability) => `${capability}, `)}
          </Card.Description>
        </Card.Content>
        {this.editExtra(this.props.admin)}
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProfileCard.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    instruments: PropTypes.array,
    tastes: PropTypes.array,
    goals: PropTypes.array,
    capabilities: PropTypes.array,
    _id: PropTypes.string,
  }).isRequired,
  admin: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileCard);
