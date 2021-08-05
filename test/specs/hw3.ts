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
    const LikesTable = await RatingPage.LikesTable;


    const LikesNumbersTable: string[] = [];
    for (const TmpLike of LikesTable) {
      const Like = await TmpLike.getText();
      LikesNumbersTable.push(Like);
    }

    const ActualLikes = LikesNumbersTable.map(i=>Number(i));
    const SortedLikes = ActualLikes.sort((a, b) => b - a);

    allureReporter.startStep('Проверка упорядоченности лайков');
    allureReporter.addAttachment('Ожидаемый массив лайков', SortedLikes.join('; '), 'text/plain');
    allureReporter.addAttachment('Актуальный массив лайков', ActualLikes.join('; '), 'text/plain');
    expect(ActualLikes).toEqual(SortedLikes);
    allureReporter.endStep();

  });
});
// npx wdio run ./wdio.conf.ts --spec hw3