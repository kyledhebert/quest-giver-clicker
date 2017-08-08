import { QuestGiverClickerPage } from './app.po';

describe('quest-giver-clicker App', () => {
  let page: QuestGiverClickerPage;

  beforeEach(() => {
    page = new QuestGiverClickerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
