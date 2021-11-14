import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <Image size='large' src ='/images/signin1.png'/>
          <h5>Sign up and create your own music profile</h5>
        </Grid.Column>
        <Grid.Column>
          <Image size='large' src ='/images/profiles1.png'/>
          <h5>Customize music profile</h5>
        </Grid.Column>
        <Grid.Column>
          <Image size='large' src ='/images/userhome1.png'/>
          <h5>Browse other users profiles</h5>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Landing;
