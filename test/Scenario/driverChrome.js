const webdriver = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');
const optionsChrome = new Chrome.Options();
const preference = new webdriver.logging.Preferences();
preference.setLevel(webdriver.logging.Type.BROWSER, webdriver.logging.Level.ALL);
optionsChrome.setLoggingPrefs(preference);


let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(optionsChrome)
    .forBrowser('chrome').build();
module.exports = driver;
// Why not export module