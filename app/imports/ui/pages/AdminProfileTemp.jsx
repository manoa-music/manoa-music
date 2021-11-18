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
class AdminProfileTemp extends React.Component {

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
              <Image src='https://pyxis.nymag.com/v1/imgs/fdf/db0/421af17121276a71945282e440357c43cb-25-post-malone-2.rsquare.w700.jpg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Post-Malone</Card.Header>
                <Card.Meta>Hip-Hop/Rap</Card.Meta>
                <Card.Description>
                  American rapper, singer, songwriter, record producer
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
            <Header as="h2" textAlign="center">Post Malone</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <Segment vertical>
                  Name: Post Malone
                </Segment>
                <Segment vertical>
                  Goals: Movie Star
                </Segment>
                <Segment vertical>
                  Instruments: Guitar
                </Segment>
                <Segment vertical>
                  Genres: Hip-hop/Rap
                </Segment>
                <SubmitField value='Back to Profiles'/>
                <SubmitField value='Delete'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default AdminProfileTemp;
