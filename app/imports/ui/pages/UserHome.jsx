import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Card, Form, Container, Dropdown, Checkbox, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ProfileCard from '../components/ProfileCard';
import { Profiles } from '../../api/profile/Profiles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserHome extends React.Component {

  // Required for Rerendering. Contains Current Filters
  state = { name: '', Instrument: [], Taste: [], Goal: [], Capability: [] };

  // Temporary Data
  profiles = [{ firstName: 'Bob', lastName: 'Zim', instruments: ['Guitar'], tastes: ['Rock'], goals: ['Occasional'],
    capabilities: ['Music Theory'] }, { firstName: 'Tim', lastName: 'Goat', instruments: ['Piano', 'Tuba'], tastes: ['Pop Music'],
    goals: ['Music Career'], capabilities: ['Singing'] }, { firstName: 'Sasha', lastName: 'Cup', instruments: ['Drums'], tastes: ['Classical'], goals: ['Jam Session'], capabilities: ['Singing', 'Music Theory'] }];

  instruments = ['Guitar', 'Piano', 'Drums', 'Clarinet', 'Violin', 'Tuba'];

  tastes = ['Rock', 'Pop Music', 'Jazz', 'Rap', 'Classical'];

  goals = ['Occasional', 'Perfoming Bands', 'Jam Session', 'Music Career'];

  capabilities = ['Singing', 'Music Theory'];

  // Filter by name, allowing first name, last name, or both.
  filterProfiles(entireProfiles) {
    let filteredProfiles = entireProfiles;
    filteredProfiles = filteredProfiles.filter((profile) => {
      let nameBool = true;
      if (this.state.name.length > 0) {
        const fullName = `${profile.firstName} ${profile.lastName}`;
        nameBool = profile.firstName.startsWith(this.state.name) || profile.lastName.startsWith(this.state.name) || fullName.startsWith(this.state.name);
      }
      let instrumentBool = true;
      if (this.state.Instrument.length > 0) {
        this.state.Instrument.forEach((instrument) => {
          if (profile.instruments.indexOf(instrument) === -1) {
            instrumentBool = false;
          }
        });
      }
      let tasteBool = true;
      if (this.state.Taste.length > 0) {
        this.state.Taste.forEach((taste) => {
          if (profile.tastes.indexOf(taste) === -1) {
            tasteBool = false;
          }
        });
      }
      let goalBool = true;
      if (this.state.Goal.length > 0) {
        this.state.Goal.forEach((goal) => {
          if (profile.goals.indexOf(goal) === -1) {
            goalBool = false;
          }
        });
      }
      let capbBool = true;
      if (this.state.Capability.length > 0) {
        this.state.Capability.forEach((capability) => {
          if (profile.capabilities.indexOf(capability) === -1) {
            capbBool = false;
          }
        });
      }
      return nameBool && instrumentBool && tasteBool && goalBool && capbBool;
    });
    return filteredProfiles;
  }

  // Must use setState to rerender page. Prefered to use => way of setState to avoid error: setState is not function.
  searchName = (e, searchTerm) => this.setState({ name: searchTerm.value });

  setTags = (e, checkbox) => {
    console.log(checkbox);
    this.setState((state) => {
      const listOfTags = state[checkbox.className];
      if (checkbox.checked) {
        listOfTags.push(checkbox.label);
      } else {
        const i = listOfTags.indexOf(checkbox.label);
        if (i !== -1) {
          listOfTags.splice(i, 1);
        }
      }
      return { [checkbox.className]: listOfTags };
    });
    console.log(this.state[checkbox.className]);
  };

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Form>
          <Form.Group>
            <Form.Input onChange={this.searchName} placeholder='Name'/>
            <Form.Dropdown simple text='Instrument'>
              <Dropdown.Menu widths={3}>
                <Grid columns={5}>
                  {/* eslint-disable-next-line react/jsx-key */}
                  {this.instruments.map((instrument) => <Grid.Column width={3}>
                    <Checkbox className='Instrument' label={instrument} onChange={this.setTags}/>
                  </Grid.Column>)}
                </Grid>
              </Dropdown.Menu>
            </Form.Dropdown>
            <Form.Dropdown simple text='Taste'>
              <Dropdown.Menu widths={3}>
                <Grid columns={5}>
                  {/* eslint-disable-next-line react/jsx-key */}
                  {this.tastes.map((taste) => <Grid.Column width={3}>
                    <Checkbox className='Taste' label={taste} onChange={this.setTags}/>
                  </Grid.Column>)}
                </Grid>
              </Dropdown.Menu>
            </Form.Dropdown>
            <Form.Dropdown simple text='Goals'>
              <Dropdown.Menu widths={3}>
                <Grid columns={5}>
                  {/* eslint-disable-next-line react/jsx-key */}
                  {this.goals.map((goal) => <Grid.Column width={15}>
                    <Checkbox className='Goal' label={goal} onChange={this.setTags}/>
                  </Grid.Column>)}
                </Grid>
              </Dropdown.Menu>
            </Form.Dropdown>
            <Form.Dropdown simple text='Capabilities'>
              <Dropdown.Menu widths={3}>
                <Grid columns={5}>
                  {/* eslint-disable-next-line react/jsx-key */}
                  {this.capabilities.map((capability) => <Grid.Column width={15}>
                    <Checkbox className='Capability' label={capability} onChange={this.setTags}/>
                  </Grid.Column>)}
                </Grid>
              </Dropdown.Menu>
            </Form.Dropdown>
          </Form.Group>
        </Form>
        <Card.Group stackable itemsPerRow="5">
          {/* eslint-disable-next-line react/jsx-key */}
          {this.filterProfiles(this.props.profiles).map((profile) => <ProfileCard profile={profile}/>)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
UserHome.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
// Implement subcription and publication for profiles
export default withTracker(() => {
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const ready = subscription.ready();
  const profiles = Profiles.collection.find({}).fetch();
  return {
    profiles,
    ready,
  };
})(UserHome);
