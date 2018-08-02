const LoginBasic = require('../Auth/LoginBasic.spec.js');
// const fs = require('fs');
const path = require('path');
let driver;
if (process.env.driver === 'firefox') {
  driver = require('../driverFirefox.js');
}
if (process.env.driver === 'chrome') {
  driver = require('../driverChrome.js');
}
const {
  it,
  after,
  before,
  describe
} = require('selenium-webdriver/testing');
const By = require('selenium-webdriver').By;
const until = require('selenium-webdriver').until;

const contrAgent = require('../../../utils/selectors.js').contrAgentName;
const contrDateFrom = require('../../../utils/selectors.js').contrDateFrom;
const contrDateTo = require('../../../utils/selectors.js').contrDateTo;
const createBtn = require('../../../utils/selectors.js').createBtn;
const buttonCreateReport = require('../../../utils/selectors.js').buttonCreateReport;
let levelLogging = require('selenium-webdriver').logging.Type.BROWSER;
const residentUrl = require(path.relative('./', '../../../config/login.js')).residentUrl;
const fakeData = require('../../../config/fake_data.js');


describe('written moch data in form', function () {
  before(async function () {
    await LoginBasic();
    console.log('--------------------------------------------');
    await driver.get(residentUrl);
    await driver.manage().window().maximize();
    await driver.manage().deleteAllCookies();
  });

  after(async function () {
    await driver.close();
    await driver.quit();
  });

  it('write moch data in profitability', function () {
    let scriptToExecute = 'var performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {}; var network = performance.getEntries() || {}; return network;';


    driver.wait(until.elementLocated(By.css(buttonCreateReport)), 20000)
      .then(function (element) {
        return driver.wait(until.elementIsVisible(element), 20000);
      }).then(function (button) {
        button.click();
      });

    driver.wait(until.elementLocated(By.css(contrAgent)), 20000).then(element => {
      return driver.wait(until.elementIsVisible(element), 20000);
    }).then(function (input) {
      input.sendKeys(fakeData().contrAgentname);
    }).catch(function (error) {
      console.log(error);
    });

    driver.wait(until.elementLocated(By.name(contrDateFrom)), 20000).then(element => {
      return driver.wait(until.elementIsVisible(element), 20000);
    }).then(input => {
      input.sendKeys(fakeData().contrAgentDataFrom);
    }).catch(function (error) {
      console.log(error);
    });

    driver.wait(until.elementLocated(By.name(contrDateTo)), 20000).then(element => {
      return driver.wait(until.elementIsVisible(element), 20000);
    }).then(input => {
      input.sendKeys(fakeData().contrAgentDataTo);
    }).catch(function (error) {
      console.log(error);
    });

    driver.wait(until.elementLocated(By.css(createBtn)), 20000)
      .then(function (element) {
        return driver.wait(until.elementIsVisible(element), 20000);
      }).then(function (button) {
        driver.actions().mouseMove(button).mouseUp().mouseDown();
        driver.executeScript(scriptToExecute).then(() => {
          driver.manage().logs().get(levelLogging).then((logs) => {
            console.log(logs);
          });
        }).catch((error) => {
          console.log(error);
        });
      }).catch(function (error) {
        console.log(error);
      });
  });
});