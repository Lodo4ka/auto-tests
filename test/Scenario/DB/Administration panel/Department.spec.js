const LoginBasic = require("../../Auth/LoginBasic.spec.js");
const path = require("path");
let driver;
let defaultProxy;
const {
  it,
  after,
  before,
  describe
} = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const until = require("selenium-webdriver").until;
const adminUrl = require(path.relative("./", "../../../../config/login.js"))
  .adminUrl;
const TIMEOUT = 100000;
const chai = require("chai");
const fakeData = require("../../../../config/fake_data.js");
const linkAdminDep = require("../../../../utils/selectors.js").linkAdminDep;
const inputDepartment = require("../../../../utils/selectors.js").inputDepartment;
const btnCreateDep = require("../../../../utils/selectors.js").btnCreateDep;
const textareaDepartment = require("../../../../utils/selectors.js").textareaDepartment;
const btnCreateDepartment = require("../../../../utils/selectors.js").btnCreateDepartment;
const saveBtnDepartment = require("../../../../utils/selectors.js").saveBtnDepartment;
const TestHelper = require("../../../../utils/TestHelper");
const assert = chai.assert;
let connection;

describe("check DB department", function () {

  before(async function (done) {
    let result = await LoginBasic();
    driver = result.driver;
    defaultProxy = result.defaultProxy;
    connection = result.connection;
    await driver.get(adminUrl);
    await driver
      .manage()
      .window()
      .maximize();
    done();
  });

  after(async function (done) {
    await defaultProxy.closeProxies();
    await defaultProxy.end();
    await driver.close();
    await driver.quit();
    await connection.end();
    await done();
  });

  it("check write and delete DB department without privilege sale", async function () {

    let beforeId = 0;
    let afterId = 0;
    let status = "";
    let sale = "";

    connection.query("SELECT * FROM departments ORDER BY department_id DESC LIMIT 1", function (error, result) {
      if (error) {
        throw error;
      }
      beforeId = result[0].department_id;
    });

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

    await connection.query("SELECT * FROM departments ORDER BY department_id DESC LIMIT 1", async function (error, result) {
      if (error) {
        throw error;
      }
      afterId = result[0].department_id;
      status = result[0].status;
      sale = result[0].sale;
      await assert.isOk(beforeId + 1 === afterId, "id is incremented");
      await assert.isOk(status === "active", "the entry was created");
      await assert.isOk(sale === "no", "entry has not privilege sale");
    });
  });

  it("write and delete DB department with privilege sale", async function () {

    let beforeId = 0;
    let afterId = 0;
    let status = "";
    let sale = "";

    connection.query("SELECT * FROM departments ORDER BY department_id DESC LIMIT 1", function (error, result) {
      if (error) {
        throw error;
      }
      beforeId = result[0].department_id;
    });

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

    await driver.executeScript(`
      let checkbox = document.querySelector("[cellpadding] tbody tr:last-of-type td:nth-of-type(3)  input[type='checkbox']");
      checkbox.click();
    `);

    await driver.executeScript(`
      let saveBtn = document.querySelector("[cellpadding] tbody tr:last-of-type td:nth-of-type(4) button:first-of-type");
      saveBtn.click();
    `);

    await driver.executeScript(`
      let delBtn = document.querySelector("[cellpadding] tbody tr:last-of-type td:nth-of-type(4) button:last-of-type");
      delBtn.click();
    `);

    await driver.executeScript(`
      let btnYes = document.querySelector("[role] [type='button']:nth-child(19)");
      btnYes.click();
    `);

    await driver.navigate().refresh();

    let har = await defaultProxy.getHar();
    console.log("Logs from browsermob:");
    TestHelper.getRequestUrls(har.log.entries);

    await connection.query("SELECT * FROM departments ORDER BY department_id DESC LIMIT 1", async function (error, result) {
      if (error) {
        throw error;
      }
      afterId = result[0].department_id;
      status = result[0].status;
      sale = result[0].sale;
      console.log("status: ", status);
      assert.isOk(beforeId + 1 === afterId, "id is incremented");
      assert.isOk(status === "delete", "the entry was deleted");
      assert.isOk(sale === "yes", "entry has privilege sale");
    });
  });
});