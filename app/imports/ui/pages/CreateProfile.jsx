import React from 'react';
import { Grid, Segment, Header, Card, Image, Icon } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  quantity: Number,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert({ name, quantity, condition, owner },
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
    const gridStyle = { height: '500px' };
    return (
      <Grid container verticalAlign="middle" style={gridStyle}>
        <Grid.Row columns="two">
          <Grid.Column>
            <Card>
              <Image src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' wrapped ui={false} />
              <Card.Content>
                <Card.Description>
                  add a profile picture
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='spotify' />
                </a>
                <a>
                  <Icon name='soundcloud' />
                </a>
                <a>
                  <Icon name='youtube' />
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Header as="h2" textAlign="center">Profile</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <Segment vertical>
                  Name:
                  <input type="text"/>
                </Segment>
                <Segment vertical>
                  Goals:
                  <input type="text"/>
                </Segment>
                <Segment vertical>
                  Instruments:
                  <input type="text"/>
                </Segment>
                <Segment vertical>
                  Capabilities:
                  <input type="text"/>
                </Segment>
                <Segment vertical>
                  Genres:
                  <input type="text"/>
                </Segment>
                <SubmitField value='Create Profile'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default AddStuff;
