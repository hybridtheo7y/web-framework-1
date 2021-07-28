import MainPage from '../../src/pageObjects/MainPage';
import RatingPage from '../../src/pageObjects/RatingPage';
import api from '../../src/api/coreApi';
import CatInfoPage from "../../src/pageObjects/CatInfoPage";
import allureReporter from "@wdio/allure-reporter";


describe('Упорядоченность ретинга лайков', async () => {


  it('Проверка упорядоченности котиков в ретинге лайков', async () => {
    await MainPage.open();
    const CatRatingBtn = await MainPage.CatRatingBtn;
    await CatRatingBtn.click();
    await RatingPage.waitForLoaded();
    const LikesTable = await browser.$$('//td[contains(@class,\'success\')]');
    const NamesTable = await browser.$$('//table[1]//td[contains(@class,\'1OPc8\')]'); // в данном случае не смог придумать селектора лучше, во второй таблице у элемента имени точно такие же данные

    const LikesNumbersTable: string[] = [];
    for (const tmp_like of LikesTable) {
      const like = await tmp_like.getText();
      LikesNumbersTable.push(like);
    }

    const ResultNamesTable: string[] = [];
    for (const tmp_name of NamesTable) {
      const name = await tmp_name.getText();
      ResultNamesTable.push(name);
    }

    const Num_of_Likes = LikesNumbersTable.map(i=>Number(i))

    allureReporter.startStep('Проверка упорядоченности лайков');
    for (let i = 0; i < Num_of_Likes.length - 1; i++){
      expect(Num_of_Likes[i]).toBeGreaterThanOrEqual(Num_of_Likes[i+1]);
      const msg = `Значение лайков котика ${ResultNamesTable[i]} №${i+1} рейтинга`;
      allureReporter.addAttachment(msg, Num_of_Likes[i].toString(), 'text/plain')
    }

    const msg = `Значение лайков котика ${ResultNamesTable[Num_of_Likes.length - 1]} №${Num_of_Likes.length} рейтинга`;
    allureReporter.addAttachment(msg, Num_of_Likes[Num_of_Likes.length - 1].toString(), 'text/plain')
    allureReporter.endStep();

  });
});
// npx wdio run ./wdio.conf.ts --spec hw3