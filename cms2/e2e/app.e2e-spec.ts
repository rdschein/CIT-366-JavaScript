import { Cms2Page } from './app.po';

describe('cms2 App', () => {
  let page: Cms2Page;

  beforeEach(() => {
    page = new Cms2Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
