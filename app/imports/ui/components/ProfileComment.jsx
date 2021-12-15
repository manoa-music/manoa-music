import React from 'react';
import { Item, Icon, Feed, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddReview from './AddReview';
import Review from './Review';

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
          <QueryLinks link1={this.props.profile.link_1} link2={this.props.profile.link_2} link3={this.props.profile.link_3}/>
        </Item.Content>
        <Card>
          <Card.Content>
            <Feed>
              {this.props.reviews.map((review, index) => <Review key={index}
                review={review}/>)}
            </Feed>
            <Card.Content extra>
              <AddReview contactId={this.props.profile._id}/>
            </Card.Content>
          </Card.Content>
        </Card>
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
    link_1: PropTypes.string,
    link_2: PropTypes.string,
    link_3: PropTypes.string,
  }).isRequired,
  reviews: PropTypes.array.isRequired,
};

QueryLinks.propTypes = {
  link1: PropTypes.string,
  link2: PropTypes.string,
  link3: PropTypes.string,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileComment);
