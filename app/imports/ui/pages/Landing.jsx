import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <Image size='large' src ='/images/signin1.png'/>
          <h3>Sign up and create your own music profile</h3>
        </Grid.Column>
        <Grid.Column>
          <Link to="/add">
          <Image size='large' src ='/images/profiles1.png'/>
          <h3>Customize music profile</h3>
          </Link>
        </Grid.Column>
        <Grid.Column>
          <Image size='large' src ='/images/userhome1.png'/>
          <h3>Browse other users profiles</h3>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Landing;
