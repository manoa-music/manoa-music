import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink, withRouter } from 'react-router-dom';
import { Dropdown, Header, Image, Menu } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1'>Manoa Music <Image size="mini" src="https://www.clipartmax.com/png/full/15-153553_green-music-notes-clipart-music-note-clip-art.png"/></Header>
        </Menu.Item>
        {this.props.currentUser ? (
          [
            <Menu.Item id="navbar-create-jam-session-page" as={NavLink} activeClassName="active" exact to="/createsession" key='add'>Create Jam Session</Menu.Item>,
            <Menu.Item id="navbar-list-jam-sessions-page" as={NavLink} activeClassName="active" exact to="/listjamsessions" key='add'>List Jam Sessions</Menu.Item>,
            <Menu.Item id="navbar-user-home" as={NavLink} activeClassName="active" exact to="/userhome" key='user'>List Profiles</Menu.Item>,
          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          [
            <Menu.Item id="navbar-list-profiles-admin-page" as={NavLink} activeClassName="active" exact to="/adminhome" key='admin'>List Profiles (Admin)</Menu.Item>,
            <Menu.Item id="navbar-add-tags-page" as={NavLink} activeClassName="active" exact to="/addTags" key='admin'>Add Tags (Admin)</Menu.Item>,
          ]
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="sign-in" pointing="top right">
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" inverted text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" inverted text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
