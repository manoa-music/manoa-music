import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

class ProfileComp extends React.Component {

  deleteProfile = (docID) => {
    console.log(`item to delete: ${docID}`);
    this.props.Profiles.collection.remove(docID);
  }

  render() {
    console.log(this.props.profile.lastName);
    return (
      <Card centered>
        <Link id="profile-image" to={`/userprofile/${this.props.profile._id}`}><Image src={this.props.profile.pic}/></Link>
        <Card.Content>
          <Card.Header>
            {this.props.profile.firstName} {this.props.profile.lastName}
          </Card.Header>
          <Card.Meta>
            <span>{this.props.profile.genres.map((genre) => `${genre}, `)}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.profile.instruments.map((instrument) => `${instrument}, `)}
          </Card.Description>
          <Card.Description>
            {this.props.profile.capabilities.map((capability) => `${capability}, `)}
          </Card.Description>
          <Card.Description>
            {this.props.profile.goals.map((goal) => `${goal}, `)}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <a href={this.props.profile.link_1}>
            <Icon name='spotify'/>
          </a>
          <a href={this.props.profile.link_2}>
            <Icon name='soundcloud'/>
          </a>
          <a to={this.props.profile.link_3}>
            <Icon name='youtube'/>
          </a>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProfileComp.propTypes = {
  // profile: PropTypes.object.isRequired,
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    pic: PropTypes.string,
    description: PropTypes.string,
    instruments: PropTypes.array,
    genres: PropTypes.array,
    goals: PropTypes.array,
    capabilities: PropTypes.array,
    _id: PropTypes.string,
    link_1: PropTypes.string,
    link_2: PropTypes.string,
    link_3: PropTypes.string,
    // Testing
    // accOwner: PropTypes.string,
  }).isRequired,
  Profiles: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileComp);
