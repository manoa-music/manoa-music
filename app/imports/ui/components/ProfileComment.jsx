import React from 'react';
import { Item, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileComment extends React.Component {
  render() {
    return (
      <Item>
        <Item.Image size='tiny' src={this.props.profile.image} wrapped ui={false}/>
        <Item.Content>
          <Item.Header as='a'>{this.props.profile.firstName} {this.props.profile.lastName}</Item.Header>
          <Item.Meta>{this.props.profile.tastes}</Item.Meta>
          <Item.Description>
            {this.props.profile.instruments}
          </Item.Description>
          <Item.Description>
            {this.props.profile.capabilities}
          </Item.Description>
          <Item.Description>
            {this.props.profile.goals}
          </Item.Description>
        </Item.Content>
        <Item.Content>
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
      </Item>
    );
  }
}

// Require a document to be passed to this component.
ProfileComment.propTypes = {
  // profile: PropTypes.object.isRequired,
  profile: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileComment);
