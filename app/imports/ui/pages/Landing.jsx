import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <h1> Connect with UH Manoa Musicians</h1>
        <Grid centered columns={3} id="landing-page">
          <Grid.Column>
            <Link to= "/signup">
              <Image size='large' src ='/images/signin1.png'/>
              <h3>Sign up</h3>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to="/add">
              <Image size='large' src ='/images/profiles1.png'/>
              <h3>Customize music profile</h3>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link to= "/userhome">
              <Image size='large' src ='/images/userhome1.png'/>
              <h3>Browse other users profiles</h3>
            </Link>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Landing;
