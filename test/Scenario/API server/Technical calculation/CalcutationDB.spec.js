const LoginBasic = require("../../Auth/LoginBasic.spec.js");
const path = require("path");
let driver;
let defaultProxy;
const { it, after, before, describe } = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const until = require("selenium-webdriver").until;
const calculationsUrl = require(path.relative("./", "../../../../config/login.js"))
  .calculationsUrl;
const TIMEOUT = 100000;
const TestHelper = require("../../../../utils/TestHelper");
const chai = require("chai");
const fakeData = require("../../../../config/fake_data.js");
const formaCompleteProduct = require("../../../../utils/selectors.js").formaCompleteProduct;
const saveBtnCalculation = require("../../../../utils/selectors.js").saveBtnCalculation;
const  assert = chai.assert;
let connection;

describe("written mocha data in technical calculations section", function() {

  before(async function(done) {
    let result = await LoginBasic();
    driver = result.driver;
    defaultProxy = result.defaultProxy;
    connection = result.connection;
    await driver.get(calculationsUrl);
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

  it("write moch data in calculations section and check HTTP POST query", async function() {

    let beforeId = 0;
    let afterId = 0;

    await driver.executeScript(`
      let form = document.querySelector('form[action="/calculations"]');
      form.submit();
    `);

    connection.query("SELECT * FROM tech_calculations ORDER BY calculation_id DESC LIMIT 1", function(error, result) {
      if(error) {
        throw error;
      }
      beforeId = result[0].calculation_id;
    });

    const inputstextareaNumberLocated = await driver.wait(
      until.elementsLocated(
        By.css(
          "#formCalculationInfo .col-sm-6 input[type=\"number\"], #formCalculationInfo .form-group textarea"
        )
      ),
      TIMEOUT
    );

    const optionFormaLocated = await driver.wait(until.elementLocated(By.xpath(formaCompleteProduct)), TIMEOUT);
    const optionFormaVisible = await driver.wait(until.elementIsVisible(optionFormaLocated), TIMEOUT);
    await optionFormaVisible.click();

    for (let i = 0; i <= inputstextareaNumberLocated.length - 1; i++) {
      await driver.wait(until.elementIsVisible(inputstextareaNumberLocated[i]), TIMEOUT);
      await inputstextareaNumberLocated[i].sendKeys(fakeData().number);
    }

    const saveBtnCalculationLocated =
      await driver.wait(until.elementLocated(By.xpath(saveBtnCalculation)), TIMEOUT);
    const saveBtnCalculationVisible =
      await driver.wait(until.elementIsVisible(saveBtnCalculationLocated), TIMEOUT);
    await saveBtnCalculationVisible.click();

    connection.query("SELECT * FROM tech_calculations ORDER BY calculation_id DESC LIMIT 1", function(error, result) {
      if(error) {
        throw error;
      }
      afterId =result[0].calculation_id;
      assert.isOk(beforeId + 1 === afterId);
    });

    let har = await defaultProxy.getHar();
    console.log("Logs from browsermob:");
    TestHelper.getRequestUrls(har.log.entries);
  });
});
