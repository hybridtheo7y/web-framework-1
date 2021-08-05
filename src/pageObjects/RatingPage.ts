import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RatingPage extends Page {

  get LikesTable() {
    return  browser.$$('//td[contains(@class,\'success\')]');
  }

  waitForLoaded() {
    super.waitForLoaded();
    return browser.waitUntil(async () => {
      return (await browser.$('//figure')).isExisting();
    });
  }
}
export default new RatingPage('Страница рейтинга имён');