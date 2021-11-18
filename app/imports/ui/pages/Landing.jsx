import React from 'react';
import TopBlock from '../components/TopBlock';
import MiddleBlock from '../components/MiddleBlock';
import BottomBlock from '../components/BottomBlock';
import { Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Container>
        <TopBlock/>
        <MiddleBlock/>
        <BottomBlock/>
      </Container>
    );
  }
}

export default Landing;
