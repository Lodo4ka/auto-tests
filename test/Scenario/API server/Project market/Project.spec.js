const LoginBasic = require("../../Auth/LoginBasic.spec.js");
const path = require("path");
let driver;
let defaultProxy;
const { it, after, before, describe } = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const until = require("selenium-webdriver").until;
const projectUrl = require(path.relative("./", "../../../../config/login.js"))
  .projectUrl;
const mlog = require("mocha-logger");
const addBtnProject = require("../../../../utils/selectors.js").addBtnProject;
const TIMEOUT = 100000;
const TestHelper = require("../../../../utils/TestHelper");
const chai = require("chai");
let levelLogging = require("selenium-webdriver").logging.Type.BROWSER;
const fakeData = require("../../../../config/fake_data.js");
const inputsProjectName = require("../../../../utils/selectors.js").inputsProject1;
const inputsProjectSquare = require("../../../../utils/selectors.js").inputsProject2;
const inputsProjectAdress = require("../../../../utils/selectors.js").inputsProject3;
const inputsProjectTerm = require("../../../../utils/selectors.js").inputsProject4;
const textareaProject = require("../../../../utils/selectors.js").textareaProject;
const selectOptionContactactsProjectType = require("../../../../utils/selectors.js").selectOptionContactactsProjectType;
const selectOptionContactactsProjectStageOfProject = require("../../../../utils/selectors.js").selectOptionContactactsProjectStageOfProject;
const selectOptionContactactsProjectTypeOfProject = require("../../../../utils/selectors.js").selectOptionContactactsProjectTypeOfProject;
const selectOptionContactactsProjectStatus = require("../../../../utils/selectors.js").selectOptionContactactsProjectStatus;
const selectOptionContactactsProjectDivision = require("../../../../utils/selectors.js").selectOptionContactactsProjectDivision;
const selectOptionContactactsProjectStatusSale = require("../../../../utils/selectors.js").selectOptionContactactsProjectStatusSale;
const printBtnProject = require("../../../../utils/selectors.js").printBtnProject;
const  assert = chai.assert;

describe("written mocha data in project section", function() {

  before(async function(done) {
    let result = await LoginBasic();
    driver = result.driver;
    defaultProxy = result.defaultProxy;
    await driver.get(projectUrl);
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

  it("write moch data in project section", async function() {

    await driverWaitAndClick(addBtnProject);

    const elementName = await driver.wait(
      until.elementLocated(By.css(inputsProjectName)),
      TIMEOUT
    );
    const inputName = await driver.wait(
      until.elementIsVisible(elementName),
      TIMEOUT
    );
    await inputName.sendKeys(fakeData().companyName);

    const selectOptionContactactsProjectTypelocated =
      await driver.wait(until.elementLocated(By.xpath(selectOptionContactactsProjectType)), TIMEOUT);
    const selectOptionContactactsProjectTypeVisible =
      await driver.wait(until.elementIsVisible(selectOptionContactactsProjectTypelocated), TIMEOUT);
    await selectOptionContactactsProjectTypeVisible.click();

    const selectOptionContactactsProjectStageOfProjectLocated =
      await driver.wait(until.elementLocated(By.xpath(selectOptionContactactsProjectStageOfProject)), TIMEOUT);
    const selectOptionContactactsProjectStageOfProjectVisible =
      await driver.wait(until.elementIsVisible(selectOptionContactactsProjectStageOfProjectLocated), TIMEOUT);
    await selectOptionContactactsProjectStageOfProjectVisible.click();

    const elementSquare = await driver.wait(
      until.elementLocated(By.css(inputsProjectSquare)),
      TIMEOUT
    );
    const inputSquare = await driver.wait(
      until.elementIsVisible(elementSquare),
      TIMEOUT
    );
    await inputSquare.sendKeys(fakeData().number);

    const elementAddress = await driver.wait(
      until.elementLocated(By.css(inputsProjectAdress)),
      TIMEOUT
    );
    const inputAddress = await driver.wait(
      until.elementIsVisible(elementAddress),
      TIMEOUT
    );
    await inputAddress.sendKeys(fakeData().address);

    const selectOptionContactactsProjectTypeOfProjectLocated =
      await driver.wait(until.elementLocated(By.xpath(selectOptionContactactsProjectTypeOfProject)), TIMEOUT);
    const selectOptionContactactsProjectTypeOfProjectVisible =
      await driver.wait(until.elementIsVisible(selectOptionContactactsProjectTypeOfProjectLocated), TIMEOUT);
    await selectOptionContactactsProjectTypeOfProjectVisible.click();

    const selectOptionContactactsProjectStatusLocated =
      await driver.wait(until.elementLocated(By.xpath(selectOptionContactactsProjectStatus)), TIMEOUT);
    const selectOptionContactactsProjectStatusVisible =
      await driver.wait(until.elementIsVisible(selectOptionContactactsProjectStatusLocated), TIMEOUT);
    await selectOptionContactactsProjectStatusVisible.click();

    const selectOptionContactactsProjectDivisionLocated =
      await driver.wait(until.elementLocated(By.xpath(selectOptionContactactsProjectDivision)), TIMEOUT);
    const selectOptionContactactsProjectDivisionVisible =
      await driver.wait(until.elementIsVisible(selectOptionContactactsProjectDivisionLocated), TIMEOUT);
    await selectOptionContactactsProjectDivisionVisible.click();

    const selectOptionContactactsProjectStatusSaleLocated =
      await driver.wait(until.elementLocated(By.xpath(selectOptionContactactsProjectStatusSale)), TIMEOUT);
    const selectOptionContactactsProjectStatusSaleVisible =
      await driver.wait(until.elementIsVisible(selectOptionContactactsProjectStatusSaleLocated), TIMEOUT);
    await selectOptionContactactsProjectStatusSaleVisible.click();



    const elementTerm = await driver.wait(
      until.elementLocated(By.css(inputsProjectTerm)),
      TIMEOUT
    );
    const inputTerm = await driver.wait(
      until.elementIsVisible(elementTerm),
      TIMEOUT
    );
    await inputTerm.sendKeys(fakeData().date_registration);

    const elementTextarea = await driver.wait(
      until.elementLocated(By.css(textareaProject)),
      TIMEOUT
    );
    const textarea = await driver.wait(
      until.elementIsVisible(elementTextarea),
      TIMEOUT
    );
    await textarea.sendKeys(fakeData().comment);

    await driver.executeScript(`
      const form = document.querySelector('.form-horizontal');
      form.submit();
    `);

    let har = await defaultProxy.getHar();
    console.log("Logs from browsermob:");
    TestHelper.getRequestUrls(har.log.entries);
    assert.isOk((har.log.entries.filter(obj => {
      return obj.request.method === "POST"
        && obj.request.url === "http://crm2.local/api/sales/arc/projects";
    })).length !== 0, mlog.success("test pass!!"));
    await driver.manage().logs().get(levelLogging).then(logs => {
      console.log("Logs from Browser:");
      console.log(logs);
    });

  });
  it("click print button", async function () {
    await driverWaitAndClick(printBtnProject);
  });

  async function driverWaitAndClick(element) {
    const elementLocated = await driver.wait(
      until.elementLocated(By.css(element)),
      TIMEOUT
    );
    const button = await driver.wait(
      until.elementIsVisible(elementLocated),
      TIMEOUT
    );
    await button.click();
  }
});
