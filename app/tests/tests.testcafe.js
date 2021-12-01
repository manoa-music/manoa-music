import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userHomePage } from './userhome.page';
import { createProfilePage } from './createProfile.page';
import { listProfilesPage } from './listprofiles.page';
import { listProfilesAdminPage } from './listprofilesadmin.page';
import { userProfilePage } from './userprofile.page';
import { adminEditPage } from './adminedit.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const credentials2 = { username: 'admin@foo.com', password: 'changeme' };
const edit = { firstName: 'Jacob', lastName: 'Johnson',
  description: 'Testing the Edit Page.',
  pic: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Flandscape%2F&psig=AOvVaw0U4gxRTpFwN2XdUDHNKcli&ust=1638403755162000&source=images&cd=vfe&ved=0CAgQjRxqFwoTCNCS2eOnwfQCFQAAAAAdAAAAABAD' };

fixture('meteor-application-template-react localhost test with default db').page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that create-profile page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotcreateProfilePage(testController);
  await createProfilePage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test the user home page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotouserHomePage(testController);
  await userHomePage.isDisplayed(testController);
});

test('Test the List Profiles page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotolistProfilesPage(testController);
  await listProfilesPage.isDisplayed(testController);
});

test('Test the User Profile page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotolistProfilesPage(testController);
  await listProfilesPage.isDisplayed(testController);
  await listProfilesPage.clickUserImage(testController);
  await userProfilePage.isDisplayed(testController);
});

test('Test the Admin Edit Page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.gotolistProfilesAdminPage(testController);
  await listProfilesAdminPage.isDisplayed(testController);
  await listProfilesAdminPage.clickEditAsAdmin(testController);
  await adminEditPage.isDisplayed(testController);
  await adminEditPage.editPage(testController, edit.firstName, edit.lastName, edit.description, edit.pic);
  await adminEditPage.clickEditSubmit(testController);
  await navBar.gotolistProfilesAdminPage(testController);
  await navBar.gotolistProfilesAdminPage(testController);
  await listProfilesAdminPage.isDisplayed(testController);
});

test('Test the List Profiles Admin page with Deletion', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials2.username, credentials2.password);
  await navBar.gotolistProfilesAdminPage(testController);
  await listProfilesAdminPage.isDisplayed(testController);
  await listProfilesAdminPage.clickDelete(testController);
});
