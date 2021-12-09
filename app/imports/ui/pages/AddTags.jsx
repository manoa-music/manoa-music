import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Dropdown, Header, Input, Loader, Message, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Tags } from '../../api/tags/Tags';

function ValidateName(props) {
  // eslint-disable-next-line react/prop-types
  if (props.alreadyIn) {
    return (
      <Message warning>
        {/* eslint-disable-next-line react/prop-types */}
        <Message.Header>Tag already in {props.tag}</Message.Header>
        <p>Please enter a new tag name.</p>
      </Message>
    );
    // eslint-disable-next-line react/prop-types
  } if (props.inputEmpty) {
    return (
      <Message>
        <Message.Header>Please write the name of the tag</Message.Header>
      </Message>
    );
  }
  return (
    <Button onClick={() => {
      // eslint-disable-next-line react/prop-types
      Tags.collection.update(Tags.collection.findOne()._id, { $set: { [props.tag]: props.arrayToAdd } });
      swal('Success', 'Tag Added', 'success');
    }}>Add</Button>
  );
}

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AddTags extends React.Component {

  state = { name: '' };

  currentTag = 'instruments';

  setTagName = (e, input) => this.setState({ name: input.value });

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
    const result = [...this.props.tags[0][this.currentTag]];
    result.push(this.state.name);
    let alreadyIn = true;
    if (this.props.tags[0][this.currentTag].indexOf(this.state.name) === -1) {
      alreadyIn = false;
    }
    let inputEmpty = false;
    if (this.state.name.length < 1) {
      inputEmpty = true;
    }
    return (
      <Container>
        <Header as="h2" textAlign="center">Add Tags</Header>
        <Dropdown selection placeholder="Instruments" defaultValue="instruments" options={availableTags} onChange={(e, dropdown) => {
          this.currentTag = dropdown.value;
        }}/>
        <Input placeholder="Tag Name" onChange={this.setTagName}/>
        <ValidateName alreadyIn={alreadyIn} tag={this.currentTag} arrayToAdd={result} inputEmpty={inputEmpty}/>
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
