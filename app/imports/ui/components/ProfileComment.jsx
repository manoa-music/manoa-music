import React from 'react';
import { Item, Icon, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddReview from './AddReview';
import Review from './Review';

class ProfileComment extends React.Component {
  render() {
    return (
      <Item>
        <Item.Image size='medium' src={this.props.profile.pic} wrapped ui={false}/>
        <Item.Content verticalAlign='middle'>
          <Item.Header as='a'>{this.props.profile.firstName} {this.props.profile.lastName}</Item.Header>
          <Item.Meta>{this.props.profile.genres.map((genre) => `${genre}, `)}</Item.Meta>
          <Item.Header>Instruments:</Item.Header>
          <Item.Meta>
            {this.props.profile.instruments.map((instrument) => `${instrument}, `)}
          </Item.Meta>
          <Item.Header>Description:</Item.Header>
          <Item.Meta>
            {this.props.profile.description}
          </Item.Meta>
          <Item.Header>Capabilities:</Item.Header>
          <Item.Meta>
            {this.props.profile.capabilities.map((capability) => `${capability}, `)}
          </Item.Meta>
          <Item.Header>Goals:</Item.Header>
          <Item.Meta>
            {this.props.profile.goals.map((goal) => `${goal}, `)}
          </Item.Meta>
          <a>
            <Icon name='spotify'/>
          </a>
          <a>
            <Icon name='soundcloud'/>
          </a>
          <a>
            <Icon name='youtube'/>
          </a>
        </Item.Content>
        <Item.Content>
          <Feed>
            {this.props.reviews.map((review, index) => <Review key={index} review={review}/>)}
          </Feed>
          <AddReview owner={this.props.profile.lastName} contactId={this.props.profile._id}/>
        </Item.Content>
      </Item>
    );
  }
}

// Require a document to be passed to this component.
ProfileComment.propTypes = {
  // profile: PropTypes.object.isRequired,
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    pic: PropTypes.string,
    description: PropTypes.string,
    links: PropTypes.array,
    instruments: PropTypes.array,
    genres: PropTypes.array,
    goals: PropTypes.array,
    capabilities: PropTypes.array,
    _id: PropTypes.string,
  }).isRequired,
  reviews: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileComment);
