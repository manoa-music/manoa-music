import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <h1 className ="ui center aligned header" > Connect with UH Manoa Musicians</h1>
        <Grid centered columns={4} id="landing-page">
          <Grid.Column>
            <Link to= "/signup">
              <Image class= "ui top aligned tiny image" src ='/images/signup.png'/>
              <h3>Sign up</h3>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to="/createprofile">
              <Image class="ui middle aligned tiny image" src ='/images/createProfile.png'/>
              <h3>Create profile</h3>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to="/listjamsessions">
              <Image class="ui middle aligned tiny image" src ='/images/jamSession.png'/>
              <h3>Jam Session</h3>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to= "/userhome">
              <Image class="ui bottom aligned tiny image" src ='/images/listProfile.png'/>
              <h3>Browse other users profiles</h3>
            </Link>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Landing;
