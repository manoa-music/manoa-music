import React from 'react';
import { Image, Grid, Header } from 'semantic-ui-react';

export default class BottomBlock extends React.Component {
  render() {
    const gridStyle = { height: '500px' };
    return (
      <Grid container verticalAlign="middle" style={gridStyle}>
        <Grid.Row columns="two">
          <Grid.Column>
            <Image size='large' src ='/images/userhome1.png'/>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">
              Browse other users profiles
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
