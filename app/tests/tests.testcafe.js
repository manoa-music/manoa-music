import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userHomePage } from './userhome.page';
import { createProfilePage } from './createProfile.page';
// import { listProfilesPage } from './listprofiles.page';
import { listProfilesAdminPage } from './listprofilesadmin.page';
import { userProfilePage } from './userprofile.page';
import { adminEditPage } from './adminedit.page';
import { addTagsPage } from './addtags.page';
import { listJamSessionsPage } from './listjamsessions.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentials2 = { username: 'admin@foo.com', password: 'changeme' };
const edit = { firstName: 'Jacob', lastName: 'Johnson',
  description: 'Testing the Edit Page.',
  pic: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Flandscape%2F&psig=AOvVaw0U4gxRTpFwN2XdUDHNKcli&ust=1638403755162000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCNCS2eOnwfQCFQAAAAAdAAAAABAD' };
const addMessage = { message: 'Testing the message', Name: 'Bob Zim' };
// eslint-disable-next-line max-len
const createUser = { firstN: 'First Name Test', lastN: 'Last Name Test', pic: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Flandscape%2F&psig=AOvVaw0U4gxRTpFwN2XdUDHNKcli&ust=1638403755162000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCNCS2eOnwfQCFQAAAAAdAAAAABAD', description: 'Description Test' };

fixture('meteor-application-template-react localhost test with default db').page('http://localhost:3000');

// Passed
test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

// Passed
test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// Passed
test('Test landing page with create profile', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await landingPage.gotocreateProfilePage(testController);
  await createProfilePage.createProfile(testController, createUser.firstN, createUser.lastN, createUser.pic, createUser.description);
  await createProfilePage.isDisplayed(testController);
});

// Passed
test('Test the list Jam Sessions Page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotolistJamSessionsPage(testController);
  await listJamSessionsPage.clickDelete(testController);
});

// Passed
test('Test the Add Tags Page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.gotoaddTagsPage(testController);
  await addTagsPage.createTag(testController);
});

// Passed
test('Test the user home page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotouserHomePage(testController);
  await userHomePage.isDisplayed(testController);
});

// Passed
test('Test the User Profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotouserHomePage(testController);
  await userHomePage.isDisplayed(testController);
  await userHomePage.clickUserImage(testController);
  await userProfilePage.isDisplayed(testController);
  await userProfilePage.leaveMessage(testController, addMessage.message, addMessage.Name);
});

// Passed
test('Test the Admin Edit Page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.gotolistProfilesAdminPage(testController);
  await listProfilesAdminPage.clickEditAsAdmin(testController);
  await adminEditPage.isDisplayed(testController);
  await adminEditPage.editPage(testController, edit.firstName, edit.lastName, edit.description, edit.pic);
  await adminEditPage.clickEditSubmit(testController);
  await navBar.gotolistProfilesAdminPage(testController);
  await navBar.gotolistProfilesAdminPage(testController);
});

// Passed
test('Test the List Profiles Admin page with Deletion', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.gotolistProfilesAdminPage(testController);
  // await listProfilesAdminPage.isDisplayed(testController);
  await listProfilesAdminPage.clickDelete(testController);
});
