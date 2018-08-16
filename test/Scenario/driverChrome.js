const webdriver = require("selenium-webdriver");
const Chrome = require("selenium-webdriver/chrome");
const optionsChrome = new Chrome.Options();
const preference = new webdriver.logging.Preferences();
preference.setLevel(
  webdriver.logging.Type.BROWSER,
  webdriver.logging.Level.ALL
);
optionsChrome.setLoggingPrefs(preference);
const BrowserMob = require("browsermob-proxy-client");
const seleniumProxy = require("selenium-webdriver/proxy");
const mysql = require("mysql");
let defaultProxy = BrowserMob.createClient();

async function initDriver () {
  return new Promise(async (resolve,reject) => {
    defaultProxy = BrowserMob.createClient();
    await defaultProxy.start();
    await defaultProxy.createHar();
    let driver = new webdriver.Builder()
      .withCapabilities({
        "browserName": "chrome",
        acceptSslCerts: true,
        acceptInsecureCerts: true
      })
      .setProxy(seleniumProxy.manual({
        http: "localhost:" + defaultProxy.proxy.port,
        https: "localhost:" + defaultProxy.proxy.port
      }))
      .forBrowser("chrome")
      .build();
    const connection = mysql.createConnection({
      host: "localhost",
      port: "3306",
      user: "root",
      database: "crm2",
      password: "1"
    });
    resolve({driver, defaultProxy, connection});
  });
}

module.exports = {
  initDriver
};