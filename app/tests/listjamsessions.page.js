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
}

export const listJamSessionsPage = new ListJamSessionsPage();
