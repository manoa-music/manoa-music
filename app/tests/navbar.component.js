import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  async gotouserHomePage(testController) {
    await testController.click('#navbar-user-home');
  }

  async gotcreateProfilePage(testController) {
    await testController.click('#navbar-create-profile-page');
  }

  async gotolistProfilesAdminPage(testController) {
    await testController.click('#navbar-list-profiles-admin-page');
  }

  async gotocreateJamSessionPage(testController) {
    await testController.click('#navbar-create-jam-session-page');
  }

  async gotoaddTagsPage(testController) {
    await testController.click('#navbar-add-tags-page');
  }

  async gotolistJamSessionsPage(testController) {
    await testController.click('#navbar-list-jam-sessions-page');
  }
}

export const navBar = new NavBar();
