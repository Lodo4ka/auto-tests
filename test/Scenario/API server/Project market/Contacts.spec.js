const TIMEOUT = 100000;
const fakeData = require("../../../../config/fake_data.js");
const LoginBasic = require("../../Auth/LoginBasic.spec.js");
const path = require("path");
let driver;
let defaultProxy;
const { it, after, before, describe } = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const until = require("selenium-webdriver").until;
const chai = require("chai");
const contacsUrl = require(path.relative("./", "../../../../config/login.js")).contacsUrl;
const inputsContacts = require("../../../../utils/selectors.js").inputsContacts;
const btnSucces = require("../../../../utils/selectors.js").btnSucces;
const selectOptionContactactsCompany = require("../../../../utils/selectors.js").selectOptionContactactsCompany;
const TestHelper = require("../../../../utils/TestHelper");
const mlog = require("mocha-logger");
const  assert = chai.assert;
let levelLogging = require("selenium-webdriver").logging.Type.BROWSER;

describe("written moch data in Contacts section", function () {
  before(async function(done) {
    let result = await LoginBasic();
    driver = result.driver;
    defaultProxy = result.defaultProxy;
    await driver.get(contacsUrl);
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

  it("write moch data to add contact", async function () {

    const btnLocated = await driver.wait(
      until.elementLocated(By.css(btnSucces)),
      TIMEOUT
    );
    const buttonAdd = await driver.wait(
      until.elementIsVisible(btnLocated),
      TIMEOUT
    );
    await buttonAdd.click();

    const inputsLocated = await driver.wait(
      until.elementsLocated(By.css(inputsContacts)),
      TIMEOUT
    );

    const selectOptionContactactsCompanyLocated =
      await driver.wait(until.elementLocated(By.xpath(selectOptionContactactsCompany)), TIMEOUT);
    const selectOptionContactactsVisible =
      await driver.wait(until.elementIsVisible(selectOptionContactactsCompanyLocated), TIMEOUT);
    selectOptionContactactsVisible.click();

    for (let i = 0; i <= inputsLocated.length - 1; i++) {
      await driver.wait(until.elementIsVisible(inputsLocated[i]), TIMEOUT);
      await inputsLocated[i].getAttribute("name");
      await inputsLocated[i].sendKeys(fakeData().comment);
    }

    await driver.executeScript(`
      const form = document.querySelector('.form-horizontal');
      form.submit();
    `);

    let har = await defaultProxy.getHar();
    console.log("Logs from browsermob:");
    TestHelper.getRequestUrls(har.log.entries);
    assert.isOk((har.log.entries.filter(obj => {
      return obj.request.method === "POST"
        && obj.request.url === "http://crm2.local/api/sales/arc/contacts";
    })).length !== 0, mlog.success("test pass!!"));
    await driver.manage().logs().get(levelLogging).then(logs => {
      console.log("Logs from Browser:");
      console.log(logs);
    });
  });
} );