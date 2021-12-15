import { Selector } from 'testcafe';

class UserProfilePage {
  constructor() {
    this.pageId = '#user-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(20000).expect(this.pageSelector.exists).ok();
  }

  async leaveMessage(testController, message, Name) {
    await testController.typeText('#userProfile-message', message);
    await testController.typeText('#userProfile-Name', Name);
    await testController.click('#userProfile-submit');
  }
}

export const userProfilePage = new UserProfilePage();
