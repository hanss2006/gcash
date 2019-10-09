import { PlantsPage } from './app.po';

describe('plants App', () => {
  let page: PlantsPage;

  beforeEach(() => {
    page = new PlantsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to plants!');
  });
});
