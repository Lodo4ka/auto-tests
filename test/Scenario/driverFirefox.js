const webdriver = require('selenium-webdriver');
const Firefox = require('selenium-webdriver/firefox');
const optionsFirefox = new Firefox.Options();
const preference = new webdriver.logging.Preferences();
preference.setLevel(webdriver.logging.Type.BROWSER, webdriver.logging.Level.ALL);
optionsFirefox.setLoggingPreferences(preference);

let driverFirefox = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.firefox())
  .setFirefoxOptions(optionsFirefox)
  .forBrowser('firefox').build();
module.exports = driverFirefox;