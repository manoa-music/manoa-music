import { Selector } from 'testcafe';

class ListProfilesAdminPage {
  constructor() {
    this.pageId = '#list-profiles-admin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async clickEditAsAdmin(testController) {
    await testController.click('#profile-admin-edit');
  }

  async clickDelete(testController) {
    await testController.click('#profile-admin-delete');
  }
}

export const listProfilesAdminPage = new ListProfilesAdminPage();
