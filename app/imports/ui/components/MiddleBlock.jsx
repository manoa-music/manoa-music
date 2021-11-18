import React from 'react';
import { Image, Grid, Header } from 'semantic-ui-react';

export default class MiddleBlock extends React.Component {
  render() {
    const gridStyle = { height: '500px' };
    return (
      <div className="color-template">
        <Grid container verticalAlign="middle" style={gridStyle}>
          <Grid.Row columns="two">
            <Grid.Column>
              <Header as="h3" inverted>
                Customize music profile...
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Image size='large' src ='/images/profiles1.png'/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
