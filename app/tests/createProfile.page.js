import { Selector } from 'testcafe';

class CreateProfilePage {
  constructor() {
    this.pageId = '#create-profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async createProfile(testController, firstN, lastN, pic, description) {
    await testController.typeText('#create-firstName', firstN);
    await testController.typeText('#create-lastName', lastN);
    await testController.typeText('#create-pic', pic);
    await testController.typeText('#create-description', description);
    await testController.click('#create-submit');
  }
}
export const createProfilePage = new CreateProfilePage();
