import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <h1 className ="ui center aligned header" > Connect with UH Manoa Musicians</h1>
        <Grid centered columns={4} id="landing-page">
          {this.props.currentUser === '' ? (
            <Grid.Column>
              <Link to= "/signup">
                <Image class= "ui top aligned tiny image" src ='/images/signup.png'/>
                <h3>Sign up</h3>
              </Link>
            </Grid.Column>
          ) : ('')}
          <Grid.Column>
            <Link id="landing-create-profile-page" to="/createprofile">
              <Image class="ui middle aligned tiny image" src ='/images/createProfile.png'/>
              <h3>Create profile</h3>
            </Link>
          </Grid.Column>
          <Grid.Row>
            <Grid.Column>
              <Link to="/listjamsessions">
                <Image class="ui middle aligned tiny image" src ='/images/listJam.png'/>
                <h3>Jam Session</h3>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link to= "/userhome">
                <Image class="ui bottom aligned tiny image" src ='/images/listProfile.png'/>
                <h3>Browse other users profiles</h3>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Landing.propTypes = {
  currentUser: PropTypes.string,
};

const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);
export default withRouter(LandingContainer);
