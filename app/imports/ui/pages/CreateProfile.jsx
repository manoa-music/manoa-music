import React from 'react';
import { Grid, Segment, Header, Card, Image, Icon } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, SelectField, LongTextField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Profile } from '../../api/profile/Profile';

const bridge = new SimpleSchema2Bridge(Profile.schema);

/** Renders the Page for adding a document. */
class CreateProfile extends React.Component {

  instruments = ['Guitar', 'Piano', 'Drums', 'Clarinet', 'Violin', 'Tuba'];

  tastes = ['Rock', 'Pop Music', 'Jazz', 'Rap', 'Classical'];

  goals = ['Occasional', 'Perfoming Bands', 'Jam Session', 'Music Career'];

  capabilities = ['Singing', 'Music Theory'];

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, pic, description, link_1, link_2, link_3, instruments, genres, goals, capabilities } = data;
    const owner = Meteor.user().username;
    Profile.collection.insert({ firstName, lastName, pic, description, link_1, link_2, link_3, instruments, genres, goals, capabilities, owner },
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
      <Grid container verticalAlign="middle" id='create-profile-page'>
        <Grid.Row columns="two">
          <Grid.Column>
            <Card>
              <Image src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' wrapped ui={false}/>
              <Card.Content>
                <Card.Description>
                  add a profile picture
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='spotify'/>
                </a>
                <a>
                  <Icon name='soundcloud'/>
                </a>
                <a>
                  <Icon name='youtube'/>
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Header as="h2" textAlign="center">ProfileComp</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField name="firstName"/>
                <TextField name="lastName"/>
                <TextField name="pic"/>
                <LongTextField name="description"/>
                <TextField name="link_1"/>
                <TextField name="link_2"/>
                <TextField name="link_3"/>
                <SelectField checkbox allowedValues={this.instruments} name="instruments"/>
                <SelectField checkbox allowedValues={this.goals} name="goals"/>
                <SelectField checkbox allowedValues={this.capabilities} name="capabilities"/>
                <SelectField checkbox allowedValues={this.tastes} name="genres"/>
                <SubmitField/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default CreateProfile;
