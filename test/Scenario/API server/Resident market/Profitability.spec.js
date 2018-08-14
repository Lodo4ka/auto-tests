const LoginBasic = require("../../Auth/LoginBasic.spec");
let driver;
let defaultProxy;
const { it, after, before, describe } = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const chai = require("chai");
const until = require("selenium-webdriver").until;
const contrAgent = require("../../../../utils/selectors").contrAgentName;
const contrDateFrom = require("../../../../utils/selectors").contrDateFrom;
const contrDateTo = require("../../../../utils/selectors").contrDateTo;
const createBtn = require("../../../../utils/selectors").createBtn;
const buttonCreateReport = require("../../../../utils/selectors").buttonCreateReport;
let levelLogging = require("selenium-webdriver").logging.Type.BROWSER;
const profitabilityUrl = require("../../../../config/login").profitabilityUrl;
const fakeData = require("../../../../config/fake_data");
const assert = chai.assert;
const TestHelper = require("../../../../utils/TestHelper");
const TIMEOUT = 100000;

describe("written moch data in form", function() {
  before(async function(done) {
    let result = await LoginBasic();
    driver = result.driver;
    defaultProxy = result.defaultProxy;
    await driver.get(profitabilityUrl);
    await driver
      .manage()
      .window()
      .maximize();
    done();
  });

  after(async function(done) {
    await defaultProxy.closeProxies();
    await defaultProxy.end();
    await driver.close();
    await driver.quit();
    done();
  });

  it("write moch data in profitability", async function() {
    const buttonCreateReportLocated =
      await driver.wait(until.elementLocated(By.css(buttonCreateReport)), TIMEOUT);
    const buttonCreateReportVisible =
      await driver.wait(until.elementIsVisible(buttonCreateReportLocated), TIMEOUT);
    await buttonCreateReportVisible.click();

    const contrAgentLocated =
      await driver.wait(until.elementLocated(By.css(contrAgent)), TIMEOUT);
    let contrAgentVisible =
      await driver.wait(until.elementIsVisible(contrAgentLocated), TIMEOUT);
    await contrAgentVisible.sendKeys(fakeData().contrAgentname);

    const contrDateFromLocated =
     await driver.wait(until.elementLocated(By.name(contrDateFrom)), TIMEOUT);
    const contrDateFromVisible =
      await driver.wait(until.elementIsVisible(contrDateFromLocated), TIMEOUT);
    await contrDateFromVisible.sendKeys("15.06.2010");

    const contrDateToLocated =
      await driver.wait(until.elementLocated(By.name(contrDateTo)), TIMEOUT);
    const contrDateToVisible =
        await driver.wait(until.elementIsVisible(contrDateToLocated), TIMEOUT);
    await contrDateToVisible.sendKeys("15.06.2015");

    await driver
      .wait(until.elementLocated(By.css(createBtn)), TIMEOUT)
      .then(async () => {
        await driver.executeScript(`
          let form = document.querySelector('form.form-horizontal');
          form.submit();
        `);
        let har = await defaultProxy.getHar();
        console.log("Logs from browsermob:");
        TestHelper.getRequestUrls(har.log.entries);
        assert.isOk((har.log.entries.filter(obj => {
          return obj.request.method === "POST"
          && obj.request.url === "http://crm2.local/sections/sales/resident/profitability";
        })).length !== 0,
        "test pass!!"
        );
        driver.manage().logs().get(levelLogging).then(logs => {
          console.log("Logs from Browser:");
          console.log(logs);
        });
      });
  });
});
