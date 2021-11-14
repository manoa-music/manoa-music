import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <Image src ='https://cdn1.iconfinder.com/data/icons/avatars-55/100/avatar_profile_user_music_headphones_shirt_cool-512.png'/>
          <h5>Sign up and create your own music profile</h5>
        </Grid.Column>
        <Grid.Column>
          <Image src ='https://i.pinimg.com/474x/2e/d1/52/2ed1522772a3a7c02ff76f4439f300ac.jpg'/>
          <h5>Customize music profile</h5>
        </Grid.Column>
        <Grid.Column>
          <Image src ='https://cdn1.vectorstock.com/i/1000x1000/86/30/people-play-music-in-park-vector-16378630.jpg'/>
          <h5>Browse other users profiles</h5>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Landing;
