import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, RadioField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Sessions } from '../../api/session/Session';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  location: String,
  time: Number,
  period: Array,
  'period.$': String,
  dateMonth: Array,
  'dateMonth.$': String,
  dateDay: Array,
  'dateDay.$': String,
  genres: String,
  capabilities: String,
  info: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateSession extends React.Component {

  period = ['AM', 'PM'];

  dateMonth = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  dateDay = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, location, time, period, dateMonth, dateDay, genres, capabilities, info } = data;
    const owner = Meteor.user().username;
    Sessions.collection.insert({ name, location, time, period, dateMonth, dateDay, genres, capabilities, info, owner },
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
      <Grid container centered id='create-jam-page'>
        <Grid.Column>
          <Header as="h2" textAlign="center">Create Jam Session</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id="createJam-name" name='name'/>
              <TextField id="createJam-location" name='location'/>
              <TextField id="createJam-time" name='time'/>
              <SelectField checkbox allowedValues={this.period} name='period'/>
              <SelectField checkbox allowedValues={this.dateMonth} name='dateMonth'/>
              <SelectField checkbox allowedValues={this.dateDay} name='dateDay'/>
              <TextField id="createJam-name" name='genres'/>
              <TextField id="createJam-capabilities" name='capabilities'/>
              <TextField id="createJam-info" name='info'/>
              <SubmitField id="createJam-submit" value='Create Jam Session'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreateSession;
