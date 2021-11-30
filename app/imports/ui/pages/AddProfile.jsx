import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, LongTextField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Profiles } from '../../api/profile/Profiles';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  pic: String,
  description: String,
  links: Array,
  'links.$': Object,
  'links.$.type': {
    type: String,
    allowedValues: ['Youtube', 'Spotify', 'Facebook', 'Soundcloud'],
  },
  'links.$.link': String,
  instruments: Array,
  'instruments.$': String,
  genres: Array,
  'genres.$': String,
  goals: Array,
  'goals.$': String,
  capabilities: Array,
  'capabilities.$': String,
  /*
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
   */
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddProfile extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, pic, description, links, instruments, genres, goals, capabilities } = data;
    const owner = Meteor.user().username;
    Profiles.collection.insert({ firstName, lastName, pic, description, links, instruments, genres, goals, capabilities, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Create Profile</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <LongTextField name ='description'/>
              <TextField name='pic'/>
              <SelectField checkbox allowedValues={this.data} name="goals"/>
              <SelectField checkbox allowedValues={this.data} name="links"/>
              <SelectField checkbox allowedValues={this.data} name="instruments"/>
              <SelectField checkbox allowedValues={this.data} name="capabilities"/>
              <SelectField checkbox allowedValues={this.data} name="genres"/>
              <SubmitField value='Create Profile'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddProfile;
