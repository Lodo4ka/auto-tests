const LoginBasic = require("../../Auth/LoginBasic.spec.js");
const fs = require("fs");
const path = require("path");
let driver;
if (process.env.driver === "firefox") {
  driver = require("../../driverFirefox.js");
}
if (process.env.driver === "chrome") {
  driver = require("../../driverChrome.js").driver;
}
const { it, after, before, describe } = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const until = require("selenium-webdriver").until;
const projectUrl = require(path.relative("./", "../../../../config/login.js"))
  .projectUrl;
const addBtnProject = require("../../../../utils/selectors.js").addBtnProject;
const TIMEOUT = 100000;
const fakeData = require("../../../../config/fake_data.js");
const inputsProjectName = require("../../../../utils/selectors.js")
  .inputsProject1;
const inputsProjectSquare = require("../../../../utils/selectors.js")
  .inputsProject2;
const inputsProjectAdress = require("../../../../utils/selectors.js")
  .inputsProject3;
const inputsProjectTerm = require("../../../../utils/selectors.js")
  .inputsProject4;
const textareaProject = require("../../../../utils/selectors.js")
  .textareaProject;
const selectProject = require("../../../../utils/selectors.js").selectProject;
const spanProject1 = require("../../../../utils/selectors.js").spanProject1;
const spanProjectSelection = require("../../../../utils/selectors.js")
  .spanProjectSelection;
const addProjectBtn = require("../../../../utils/selectors.js").addProjectBtn;
const printBtnProject = require("../../../../utils/selectors.js").printBtnProject;


describe("written mocha data in project section", function() {

  before(async function(done) {
    await LoginBasic();
    await driver.get(projectUrl);
    await driver
      .manage()
      .window()
      .maximize();
    // await driver.manage().deleteAllCookies();
    done();
  });

  after(async function() {
    await driver.close();
    await driver.quit();
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
    await inputName.sendKeys(fakeData().comment);

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
    await inputAddress.sendKeys(fakeData().date_registration);

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

    // const elementSelect = await driver.wait(
    //   until.elementLocated(By.css(selectProject)),
    //   TIMEOUT
    // );
    // const select = await driver.wait(
    //   until.elementIsVisible(elementSelect),
    //   TIMEOUT
    // );
    // await select.selectByValue("1");

    // const selectionOne = await driver.wait(
    //   until.elementLocated(By.css(spanProjectSelection)),
    //   TIMEOUT
    // );
    // const selection = await driver.wait(
    //   until.elementIsVisible(selectionOne),
    //   TIMEOUT
    // );
    // await selection.click();

    driver
      .manage()
      .logs()
      .get("browser")
      .then(function(logsEntries) {
        logsEntries.forEach(function(l) {
          console.log(l);
        });
      });

    const elemaddProjectBtn = await driver.wait(
      until.elementLocated(By.css(addProjectBtn)),
      TIMEOUT
    );
    driver.wait(
      until.elementIsVisible(elemaddProjectBtn),
      TIMEOUT
    ).then(() => {
      driver.executeScript(`
        let form = document.querySelector('form.form-horizontal');
        form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('form submitted');
        form.submit();
      });
      form.submit();
      `);
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
