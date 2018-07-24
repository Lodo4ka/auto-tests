const webdriver = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');
const optionsChrome = new Chrome.Options();

let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(optionsChrome)
    .forBrowser('chrome').build();
module.exports = driver;