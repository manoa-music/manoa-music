import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

function whichSite(str) {
  if (str.includes('youtube')) {
    return 'youtube';
  }
  if (str.includes('spotify')) {
    return 'spotify';
  }
  if (str.includes('soundcloud')) {
    return 'soundcloud';
  }
  if (str.includes('twitter')) {
    return 'twitter';
  }
  return 'question circle';
}

function QueryLinks(props) {
  const arr = [];
  if (props.link1.length > 0){
    arr.push(props.link1);
  }
  if (props.link2.length > 0) {
    arr.push(props.link2);
  }
  if (props.link3.length > 0) {
    arr.push(props.link3);
  }
  return (
    <div>
      {arr.map((str) =>
        // eslint-disable-next-line react/jsx-key,implicit-arrow-linebreak
        (<a href={str}>
          <Icon name={whichSite(str)}/>
        </a>))}
    </div>
  );
}

class ProfileComp extends React.Component {

  deleteProfile = (docID) => {
    console.log(`item to delete: ${docID}`);
    this.props.Profiles.collection.remove(docID);
  }

  render() {
    console.log(this.props.profile.lastName);
    return (
      <Card centered>
        <Link id="profile-image-link" to={`/userprofile/${this.props.profile._id}`}><Image src={this.props.profile.pic}/></Link>
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
          <QueryLinks link1={this.props.profile.link_1} link2={this.props.profile.link_2} link3={this.props.profile.link_3}/>
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

QueryLinks.propTypes = {
  link1: PropTypes.string,
  link2: PropTypes.string,
  link3: PropTypes.string,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileComp);
