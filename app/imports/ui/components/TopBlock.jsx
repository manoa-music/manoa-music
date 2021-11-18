import React from 'react';
import { Image, Grid, Header } from 'semantic-ui-react';

export default class TopBlock extends React.Component {
  render() {
    const gridStyle = { height: '500px' };
    return (
      <Grid container verticalAlign="middle" style={gridStyle}>
        <Grid.Row columns="two">
          <Grid.Column>
            <Image size='large' src ='/images/signin1.png'/>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">
              Sign up and create your own music profile...
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
