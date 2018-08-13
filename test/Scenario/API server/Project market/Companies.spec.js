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
const companiesUrl = require(path.relative("./", "../../../../config/login.js")).companiesUrl;
const inputsCompanies = require("../../../../utils/selectors.js").inputsCompanies;
const addBtnCompanies = require("../../../../utils/selectors.js").addBtnCompanies;
const tabCompanies = require("../../../../utils/selectors.js").tabCompanies;
const selectCompaniesTypeOfCompany = require("../../../../utils/selectors.js").selectCompaniesTypeOfCompany;
const selectOptionCompaniesStatus = require("../../../../utils/selectors.js").selectOptionCompaniesStatus;
const TestHelper = require("../../../../utils/TestHelper");
const mlog = require("mocha-logger");
const  assert = chai.assert;
let levelLogging = require("selenium-webdriver").logging.Type.BROWSER;



describe.only("written moch data in Companies section", function () {
  before(async function(done) {
    let result = await LoginBasic();
    driver = result.driver;
    defaultProxy = result.defaultProxy;
    await driver.get(companiesUrl);
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

  it.only("write moch data to add company", async function () {

    let page = 0;
    let pageInput = 0;
    let pageIndex = 0;
    let tabCount = 0;

    const btnLocated = await driver.wait(
      until.elementLocated(By.css(addBtnCompanies)),
      TIMEOUT
    );
    const buttonAdd = await driver.wait(
      until.elementIsVisible(btnLocated),
      TIMEOUT
    );
    await buttonAdd.click();

    const inputsLocated = await driver.wait(
      until.elementsLocated(By.css(inputsCompanies)),
      TIMEOUT
    );

    const tabsLocated = await driver.wait(until.elementsLocated(By.css(tabCompanies)), TIMEOUT);

    (async function() {
      const elementsThird = await driver.wait(
        until.elementsLocated(
          By.css(
            "form.form-horizontal input, form.form-horizontal textarea"
          )
        ),
        TIMEOUT
      );
      for (let i = 0; i <= elementsThird.length - 1; i++) {
        await driver
          .wait(until.elementIsVisible(inputsLocated[i]), TIMEOUT)
          .then(bool => {
            if (bool) {
              pageIndex++;
            }
          });
      }
    })();

    (async function() {
      for (let i = 0; i <= tabsLocated.length; i++) {
        tabCount = i;
      }
    })();

    const selectCompaniesLocatedTypeOfCompany =
      await driver.wait(until.elementLocated(By.xpath(selectCompaniesTypeOfCompany)), TIMEOUT);
    const selectCompaniesTypeOfCompanyVisible =
      await driver.wait(until.elementIsVisible(selectCompaniesLocatedTypeOfCompany), TIMEOUT);
    selectCompaniesTypeOfCompanyVisible.click();

    const selectOptionCompaniesStatusVisible =
      await driver.wait(until.elementLocated(By.xpath(selectOptionCompaniesStatus)), TIMEOUT);
    const selectOptionCompaniesStatusLocated =
      await driver.wait(until.elementIsVisible(selectOptionCompaniesStatusVisible), TIMEOUT);
    selectOptionCompaniesStatusLocated.click();

    for (let i = 0; i <= inputsLocated.length - 1; i++) {
      await driver.wait(until.elementIsVisible(inputsLocated[i]), TIMEOUT);
      await inputsLocated[i].getAttribute("name");
      await inputsLocated[i].sendKeys(fakeData().comment);
      pageInput = i;
      if (pageInput >= pageIndex - 1) {
        if (page < tabCount - 1) {
          await tabsLocated[page + 1].click();
          page++;
        }
      }
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
            && obj.request.url === "http://crm2.local/api/sales/arc/companies";
    })).length !== 0, mlog.success("test pass!!"));
    await driver.manage().logs().get(levelLogging).then(logs => {
      console.log("Logs from Browser:");
      console.log(logs);
    });
  });
} );