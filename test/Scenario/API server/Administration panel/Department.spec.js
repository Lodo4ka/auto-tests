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
const linkAdminDep = require("../../../../utils/selectors.js").linkAdminDep;
const btnCreateDep = require("../../../../utils/selectors.js").btnCreateDep;
const btnCreateDepartment = require("../../../../utils/selectors.js").btnCreateDepartment;
const inputDepartment = require("../../../../utils/selectors.js").inputDepartment;
const textareaDepartment = require("../../../../utils/selectors.js").textareaDepartment;
const checkBoxDepartment = require("../../../../utils/selectors.js").checkBoxDepartment;

describe("check API server admin/departments section", function() {

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
  it("create department and check request POST, DELETE and response query", async  function() {
    const btnOpenLocated
     = await driver.wait(until.elementLocated(By.css(linkAdminDep)), TIMEOUT);
    const btnOpenVisible
    = await driver.wait(until.elementIsVisible(btnOpenLocated), TIMEOUT);
    await btnOpenVisible.click();

    const btnCreateDepLocated
    = await driver.wait(until.elementLocated(By.css(btnCreateDep)), TIMEOUT);
    const btnCreateDepVisible
    = await driver.wait(until.elementIsVisible(btnCreateDepLocated), TIMEOUT);
    await btnCreateDepVisible.click();

    const inputNameLocated
    = await driver.wait(until.elementLocated(By.css(inputDepartment)), TIMEOUT);
    const inputNameVisible
    = await driver.wait(until.elementIsVisible(inputNameLocated), TIMEOUT);
    await inputNameVisible.sendKeys(fakeData().department);

    const textareaLocated
    = await driver.wait(until.elementLocated(By.css(textareaDepartment)), TIMEOUT);
    const textareaVisible
    = await driver.wait(until.elementIsVisible(textareaLocated), TIMEOUT);
    await textareaVisible.sendKeys(fakeData().departmentOther);

    const btnCreateDepartmentLocated
    = await driver.wait(until.elementLocated(By.css(btnCreateDepartment)), TIMEOUT);
    const btnCreateDepartmentVisible
    = await driver.wait(until.elementIsVisible(btnCreateDepartmentLocated), TIMEOUT);
    await btnCreateDepartmentVisible.click();

    const checkboxLocated
    = await driver.wait(until.elementLocated(By.css(checkBoxDepartment)), TIMEOUT);
    const checkboxVisible
    = await driver.wait(until.elementIsVisible(checkboxLocated), TIMEOUT);
    await checkboxVisible.click();

    const saveBtnLocated
    = await driver.wait(until.elementLocated(By.css("[cellpadding] tbody tr:last-of-type td:nth-of-type(4) button:first-of-type")), TIMEOUT);
    const saveBtnVisible
    = await driver.wait(until.elementIsVisible(saveBtnLocated), TIMEOUT);
    await saveBtnVisible.click();

    const deleteBtnLocated
    = await driver.wait(until.elementLocated(By.css("[cellpadding] tbody tr:last-of-type td:nth-of-type(4) button:last-of-type")), TIMEOUT);
    const deleteBtnVisible
    = await driver.wait(until.elementIsVisible(deleteBtnLocated), TIMEOUT);
    await deleteBtnVisible.click();

    const yesBtnLocated
    = await driver.wait(until.elementLocated(By.css("[role] [type='button']:nth-child(19)")), TIMEOUT);
    const yesBtnVisible
    = await driver.wait(until.elementIsVisible(yesBtnLocated), TIMEOUT);
    await yesBtnVisible.click();

    await driver.navigate().refresh();

    let har = await defaultProxy.getHar();
    console.log("Logs from browsermob:");
    TestHelper.getRequestUrls(har.log.entries);

    assert.isOk((har.log.entries.filter(obj => {
      return obj.request.method === "POST" && obj.request.url === "http://crm2.local/login" &&
          obj.response.status === 302 && obj.response.statusText === "Found";
    })).length !== 0, "test pass POST http://crm2.local/login!!");

    assert.isOk((har.log.entries.filter(obj => {
      return  obj.request.method === "POST" && obj.request.url === "http://crm2.local/admin/departments"
        && obj.response.status === 302 && obj.response.statusText === "Found";
    })).length !== 0, "test pass POST http://crm2.local/login!!");

    assert.isOk((har.log.entries.filter(obj => {
      return  obj.request.method === "POST" && obj.request.url === "http://crm2.local/admin/departments"
        && obj.response.status === 200 && obj.response.statusText === "OK";
    })).length !== 0, "test pass POST http://crm2.local/login!!");

    assert.isOk((har.log.entries.filter(obj => {
      return obj.request.method === "DELETE" && obj.request.url === "http://crm2.local/admin/departments"
      && obj.response.status === 200 && obj.response.statusText === "OK";
    })).length !== 0, "test pass DELETE http://crm2.local/calculations/glass!!");

  });
});