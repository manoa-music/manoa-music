import React from 'react';
import { Grid, Segment, Header, Card, Image, Icon, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, SelectField, LongTextField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Profile } from '../../api/profile/Profile';
import { Tags } from '../../api/tags/Tags';

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

  render() {
    return (this.props.tagsReady) ? this.renderPage() : <Loader active>Getting Data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    let fRef = null;
    const tags = this.props.tags[0];
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
            <Header as="h2" textAlign="center">Create Profile</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField id="create-firstName" name="firstName"/>
                <TextField id="create-lastName" name="lastName"/>
                <TextField id="create-pic" name="pic"/>
                <LongTextField id="create-description" name="description"/>
                <TextField name="link_1"/>
                <TextField name="link_2"/>
                <TextField name="link_3"/>
                <SelectField checkbox allowedValues={tags.instruments} name="instruments"/>
                <SelectField checkbox allowedValues={tags.goals} name="goals"/>
                <SelectField checkbox allowedValues={tags.capabilities} name="capabilities"/>
                <SelectField checkbox allowedValues={tags.genres} name="genres"/>
                <SubmitField id="create-submit"/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

CreateProfile.propTypes = {
  tags: PropTypes.array.isRequired,
  tagsReady: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const tagsSubscription = Meteor.subscribe(Tags.userPublicationName);
  const tagsReady = tagsSubscription.ready();
  const tags = Tags.collection.find({}).fetch();
  return {
    tags,
    tagsReady,
  };
})(CreateProfile);
