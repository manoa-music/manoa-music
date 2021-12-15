import React from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class ProfileAdmin extends React.Component {

  deleteProfile = (docID) => {
    console.log(`item to delete: ${docID}`);
    this.props.Profiles.collection.remove(docID);
  }

  render() {
    console.log(this.props.profile.lastName);
    return (
      <Card centered>
        <Image src={this.props.profile.pic} wrapped ui={false}/>
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
        <Card.Content extra>
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
        <Card.Content extra>
        </Card.Content>
        <Card.Content extra>
          <Link id="profile-admin-edit" to={`/adminedit/${this.props.profile._id}`}>Edit as Admin</Link>
        </Card.Content>
        <Card.Content extra>
          <Button id="profile-admin-delete" onClick={() => this.deleteProfile(this.props.profile._id)}>Delete</Button>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProfileAdmin.propTypes = {
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
  }).isRequired,
  Profiles: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileAdmin);
