const LoginBasic = require("../../Auth/LoginBasic.spec");
const path = require("path");
let driver;
let defaultProxy;
const { it, after, before, describe } = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const until = require("selenium-webdriver").until;
const adminUrl = require(path.relative("./", "../../../../config/login.js"))
  .adminUrl;
const TIMEOUT = 100000;
const TestHelper = require("../../../../utils/TestHelper");
const chai = require("chai");
const fakeData = require("../../../../config/fake_data.js");
const  assert = chai.assert;
const formaCompleteProduct = require("../../../../utils/selectors.js").formaCompleteProduct;

describe.only("check API server admin/departments section", function() {

  before(async function(done) {
    let result = await LoginBasic();
    driver = result.driver;
    defaultProxy = result.defaultProxy;
    await driver.get(adminUrl);
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
    await done();
  });
  it.only("create department and check request POST and response", async  function() {
    const btnOpenLocated =  await driver.wait(until.elementLocated(By.css("a[href='/admin/departments']")), TIMEOUT);
    const btnOpenVisible =  await driver.wait(until.elementIsVisible(btnOpenLocated), TIMEOUT);
    await btnOpenVisible.click();

    const btnCreateDepLocated =  await driver.wait(until.elementLocated(By.css("button[data-target='#modalAddDepartment']")), TIMEOUT);
    const btnCreateDepVisible =  await driver.wait(until.elementIsVisible(btnCreateDepLocated), TIMEOUT);
    await btnCreateDepVisible.click();
    
  });
});