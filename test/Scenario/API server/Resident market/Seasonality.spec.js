const LoginBasic = require("../../Auth/LoginBasic.spec");
let driver;
let defaultProxy;
const chai = require("chai");
const assert = require("chai").assert;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { it, after, before, describe } = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const until = require("selenium-webdriver").until;
const TIMEOUT = 100000;
const inputsSeasonality = require("../../../../utils/selectors")
  .inputsSeasonality;
const seasonUrl = require("../../../../config/login").seasonUrl;
let levelLogging = require("selenium-webdriver").logging.Type.BROWSER;
const TestHelper = require("../../../../utils/TestHelper");
const mlog = require("mocha-logger");


describe("written data in form in section seasonality", function() {
  before(async function(done) {
    let result = await LoginBasic();
    driver = result.driver;
    defaultProxy = result.defaultProxy;
    await driver.get(seasonUrl);
    await driver
      .manage()
      .window()
      .maximize();
    done();
  });
  after(async function() {
    await defaultProxy.closeProxies();
    await defaultProxy.end();
    await driver.close();
    await driver.quit();
  });

  it("write data and submit and check API server", async function() {
    const inputs = await driver.wait(
      until.elementsLocated(By.css(inputsSeasonality)),
      TIMEOUT
    );
    for (let i = 0; i <= inputs.length - 1; i++) {
      let name_ = await inputs[i].getAttribute("name");
      driver
        .executeScript(
          "var input = document.getElementsByName(\"" +
            name_ +
            "\")[0]; console.log('work'); input.scrollIntoView();"
        )
        .then(async () => {
          await driver.wait(until.elementIsVisible(inputs[i]), TIMEOUT);
          inputs[i].sendKeys("0");
        });
    }
    await driver.executeScript(`
         const form =  document.querySelector('#seasonalityForm');
         form.submit();
        `);
    let har = await defaultProxy.getHar();
    console.log("Logs from browsermob:");
    TestHelper.getRequestUrls(har.log.entries);
    assert.isOk((har.log.entries.filter(obj => {
      return obj.request.method === "POST"
      && obj.request.url === "http://crm2.local/sections/sales/resident/bonuscalc/planmanagment/seasonality";
    })).length !== 0, mlog.success("test pass!!"));
    await driver.manage().logs().get(levelLogging).then(logs => {
      console.log("Logs from Browser:");
      console.log(logs);
    });
  });
});
