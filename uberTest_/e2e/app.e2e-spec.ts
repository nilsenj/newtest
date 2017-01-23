import { UberTestPage } from './app.po';

describe('uber-test App', function() {
  let page: UberTestPage;

  beforeEach(() => {
    page = new UberTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
