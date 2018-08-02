const LoginBasic = require('../../Auth/LoginBasic.spec.js');
// const fs = require('fs');
const path = require('path');
let driver;
if (process.env.driver === 'firefox') {
  driver = require('../../driverFirefox.js');
}
if (process.env.driver === 'chrome') {
  driver = require('../../driverChrome.js');
}
const {
  it,
  after,
  before,
  describe
} = require('selenium-webdriver/testing');
const By = require('selenium-webdriver').By;
const until = require('selenium-webdriver').until;
const projectUrl = require(path.relative('./', '../../../../config/login.js')).projectUrl;
const addBtnProject = require('../../../../utils/selectors.js').addBtnProject;
const inputsProject = require('../../../../utils/selectors.js').inputsProject;
const TIMEOUT = 100000;
const fakeData = require('../../../../config/fake_data.js');



describe('written mocha data in project section', function() {
  before(async function(done) {
    await LoginBasic();
    await driver.get(projectUrl);
    await driver.manage().window().maximize();
    done();
  });

  after( function() {
    driver.quit();
  });

  it('write moch data in project section', async function() {
    const elementFirst = await driver.wait(until.elementLocated(By.css(addBtnProject)), TIMEOUT);
    const buttonFirst = await driver.wait(until.elementIsVisible(elementFirst), TIMEOUT);
    await buttonFirst.click();

    const inputs = await driver.wait(until.elementsLocated(By.css(inputsProject)), TIMEOUT);
    for (let i = 0; i < inputs.length; i++) {
      await driver.wait(until.elementIsVisible(inputs[i]), TIMEOUT);
      inputs[i].sendKeys(fakeData().comment).catch(error => {
        console.log(error);
      });
    }
  });
});