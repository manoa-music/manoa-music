import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Dropdown, Form, Header, Input, Loader, Message } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Tags } from '../../api/tags/Tags';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AddTags extends React.Component {

  state = { name: '' };

  currentTag = 'instruments';

  setTagName = (e, input) => this.setState({ name: input.value });

  validateName() {
    if (this.props.tags[0][this.currentTag].find((tag) => tag === this.state.name)) {
      return (
        <Message warning>
          <Message.Header>Tag Already In {this.currentTag}</Message.Header>
          <p>Please Enter A New Tag Name.</p>
        </Message>
      );
    }
    else {
      return (
        <Button onClick={this.submit}>Add</Button>
      );
    }
  }

  submit() {
    Tags.collection.update()
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const availableTags = [
      {
        text: 'Instruments',
        value: 'instruments',
      },
      {
        text: 'Goals',
        value: 'goals',
      },
      {
        text: 'Genres',
        value: 'genres',
      },
      {
        text: 'Capabilities',
        value: 'capabilities',
      },
    ];
    return (
      <Container>
        <Header as="h2" textAlign="center">Add Tags</Header>
        <Dropdown selection defaultValue="Instruments" options={availableTags} onChange={(e, dropdown) => {
          console.log(this.currentTag);
          this.currentTag = dropdown.value;
          console.log(this.currentTag);
        }}/>
        <Input placeholder="Tag Name" onChange={this.setTagName}/>
        {this.validateName}
      </Container>
    );
  }
}

AddTags.propTypes = {
  tags: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Tags.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const tags = Tags.collection.find({}).fetch();
  return {
    tags,
    ready,
  };
})(AddTags);
