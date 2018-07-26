const webdriver = require('selenium-webdriver');
const Firefox = require('selenium-webdriver/opera');
const optionsFirefox = new Firefox.Options();

let driverFirefox = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.firefox())
    .setFirefoxOptions(optionsFirefox)
    .forBrowser('firefox').build();
module.exports = driverFirefox;