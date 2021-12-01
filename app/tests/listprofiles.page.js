import { Selector } from 'testcafe';

class ListProfilesPage {
  constructor() {
    this.pageId = '#list-profiles-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async clickUserImage(testController) {
    await testController.click('#profile-image-link');
  }
}

export const listProfilesPage = new ListProfilesPage();
