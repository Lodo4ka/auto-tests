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
let defaultProxy = BrowserMob.createClient();
let driver = {};

// (async function () {
//   await defaultProxy.start();
//   let har = await defaultProxy.createHar();
// })();

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
    resolve({driver, defaultProxy});
  });
}

// let driver = new webdriver.Builder()
//   .withCapabilities({"browserName": "chrome",
//     acceptSslCerts: true,
//     acceptInsecureCerts: true})
//   .setChromeOptions(optionsChrome)
//   .forBrowser("chrome")
//   .setProxy(seleniumProxy.manual({
//     http: "localhost:" + port,
//     https: "localhost:" + port }))
//   .build();

module.exports = {
  // driver,
  // defaultProxy,
  initDriver
};