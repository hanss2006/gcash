import { browser, by, element } from 'protractor';

export class PlantsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('plants-root h1')).getText();
  }
}
