import { Selector } from 'testcafe';

class UserHomePage {
  constructor() {
    this.pageId = '#user-home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async clickUserImage(testController) {
    await testController.click('#profile-image');
  }
}

export const userHomePage = new UserHomePage();
