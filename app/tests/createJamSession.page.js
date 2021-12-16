import { Selector } from 'testcafe';

class CreateJamSessionPage {
  constructor() {
    this.pageId = '#create-jam-page';
    this.pageSelector = Selector(this.pageId);
    this.checkbox = Selector('#createJam-periodJam');
    this.checkbox2 = Selector('#createJam-date');
    this.checkbox3 = Selector('#createJam-day');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async createJamSession(testController, name, location, time, genres, capabilities, info) {
    await this.isDisplayed(testController);
    await testController.typeText('#createJam-name', name);
    await testController.typeText('#createJam-location', location);
    await testController.typeText('#createJam-time', time);
    await testController.click(this.checkbox());
    await testController.click(this.checkbox2());
    await testController.click(this.checkbox3());
    await testController.typeText('#createJam-genres', genres);
    await testController.typeText('#createJam-capabilities', capabilities);
    await testController.typeText('#createJam-info', info);
    await testController.click('#createJam-submit');
  }
}
export const createJamSessionPage = new CreateJamSessionPage();
