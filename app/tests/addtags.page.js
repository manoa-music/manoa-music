import { Selector } from 'testcafe';

class AddTagsPage {
  constructor() {
    this.pageId = '#add-tags-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async createTag(testController) {
    await this.isDisplayed(testController);
    // await testController.typeText('#addTags-tag', tag);
    await testController.click('#addTags-add');
  }
}
export const addTagsPage = new AddTagsPage();
