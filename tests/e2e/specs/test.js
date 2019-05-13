// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': (browser) => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('h1')
      .assert.containsText('h1', 'Weather Application');
    browser.setValue('#username', ['9000', browser.Keys.ENTER])
      .waitForElementVisible('.station', 5000)
      .assert.elementCount('.station', 1)
      .end();
  },
};
