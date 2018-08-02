const LoginBasic = require('../Auth/LoginBasic.spec.js');
const chai = require('chai');
const assert = require('chai').assert;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
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
  describe,
} = require('selenium-webdriver/testing');
const By = require('selenium-webdriver').By;
const until = require('selenium-webdriver').until;
const TIMEOUT = 100000;
const saveBtnSeasonality = require('../../../utils/selectors.js').saveBtnSeasonality;
const fakeData = require('../../../config/fake_data.js');
const seasonUrl = require(path.relative('./', '../../../config/login.js')).seasonUrl;
let levelLogging = require('selenium-webdriver').logging.Type.BROWSER;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('written data in form in section seasonality', function(){
  before( async function (done) {
    await LoginBasic();
    await driver.get(seasonUrl);
    await driver.manage().window().maximize();
    done();
  });
  after( function() {
    // driver.quit();
  });

  it('write data and submit and check API server', async function() {
    const inputs = await driver.wait(until.elementsLocated(By.css('#seasonalityForm table tbody td input')), TIMEOUT);
    for (let i = 0; i < inputs.length; i++) {
      console.log(`before visible ${inputs[i]}`);
      await inputs[i].sendKeys('0').catch(error => {
        console.log(error);
      });
      // await driver.wait(until.elementIsSelected(inputs[i]), TIMEOUT);
      console.log(`after visible ${inputs[i]}`);
    }
    const elementFirst = await driver.wait(until.elementLocated(By.css(saveBtnSeasonality)), TIMEOUT);
    const buttonFirst = await driver.wait(until.elementIsVisible(elementFirst), TIMEOUT);
    await buttonFirst.click();
  });
});