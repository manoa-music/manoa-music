import { Selector } from 'testcafe';

class AdminEditPage {
  constructor() {
    this.pageId = '#admin-edit-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async editPage(testController, firstName, lastName, description, pic) {
    await testController.typeText('#editPage-firstName', firstName);
    await testController.typeText('#editPage-lastName', lastName);
    await testController.typeText('#editPage-description', description);
    await testController.typeText('#editPage-pic', pic);
  }

  async clickEditSubmit(testController) {
    await testController.click('#editPage-submit');
  }
}

export const adminEditPage = new AdminEditPage();
