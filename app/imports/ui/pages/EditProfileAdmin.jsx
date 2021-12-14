import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Profile } from '../../api/profile/Profile';

const bridge = new SimpleSchema2Bridge(Profile.schema);

/** Renders the Page for editing a single document. */
class EditStuffAdmin extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { firstName, lastName, pic, description, instruments, genres, goals, capabilities, _id, link_1, link_2, link_3 } = data;
    Profile.collection.update(_id, { $set: { firstName, lastName, pic, description, instruments, genres, goals, capabilities, link_1, link_2, link_3 } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered id="admin-edit-page">
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Edit ProfileComp (Admin)</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField id="editPage-firstName" name='firstName'/>
              <TextField id="editPage-lastName" name='lastName'/>
              <LongTextField id="editPage-description" name ='description'/>
              <TextField id="editPage-pic" name='pic'/>
              <SelectField checkbox allowedValues={this.data} name="goals"/>
              <SelectField checkbox allowedValues={this.data} name="instruments"/>
              <SelectField checkbox allowedValues={this.data} name="capabilities"/>
              <SelectField checkbox allowedValues={this.data} name="genres"/>
              <TextField name='link_1'/>
              <TextField name='link_2'/>
              <TextField name='link_3'/>
              <SubmitField id="editPage-submit" value='Edit ProfileComp'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditStuffAdmin.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profile.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Profile.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditStuffAdmin);
