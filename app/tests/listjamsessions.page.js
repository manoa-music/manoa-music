import { Selector } from 'testcafe';

class ListJamSessionsPage {
  constructor() {
    this.pageId = '#list-jam-sessions-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async clickDelete(testController) {
    await testController.click('#listJam-delete');
  }
}

export const listJamSessionsPage = new ListJamSessionsPage();
