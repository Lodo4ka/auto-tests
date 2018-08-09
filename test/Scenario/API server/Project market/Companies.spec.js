const TIMEOUT = 100000;
const fakeData = require("../../../../config/fake_data.js");
const LoginBasic = require("../../Auth/LoginBasic.spec.js");
const path = require("path");
let driver;
if (process.env.driver === "firefox") {
  driver = require("../../driverFirefox.js");
}
if (process.env.driver === "chrome") {
  driver = require("../../driverChrome.js");
}
const { it, after, before, describe } = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const until = require("selenium-webdriver").until;
const companiesUrl = require(path.relative("./", "../../../../config/login.js")).companiesUrl;
const inputsCompanies = require("../../../../utils/selectors.js").inputsCompanies;
const addBtnCompanies = require("../../../../utils/selectors.js").addBtnCompanies;
const tabCompanies = require("../../../../utils/selectors.js").tabCompanies;
const appendBtnCompanies = require("../../../../utils/selectors.js").appendBtnCompanies;
// const selectsCompanies = require("../../../../utils/selectors.js").selectsCompanies;

describe("written moch data in Companies section", function () {
  before(async function(done) {
    await LoginBasic();
    await driver.get(companiesUrl);
    await driver
      .manage()
      .window()
      .maximize();
    await driver.manage().deleteAllCookies();
    done();
  });

  after(async function() {
    // await driver.close();
    // await driver.quit();
  });

  it("write moch data to add company", async function () {

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

    (async function () {
      const inputsInner = await driver.wait(
        until.elementsLocated(
          By.css(
            "form.form-horizontal input:not([type=hidden]), form.form-horizontal textarea"
          )
        ),
        TIMEOUT
      );
      for (let i = 0; i <= inputsInner.length - 1; i++) {
        let result = await driver
          .wait(until.elementIsVisible(inputsInner[i]), TIMEOUT);
        if(result !== undefined) {
          pageIndex++;
          console.log(`pageIndex: ${pageIndex}`);
        }
      }
    })();

    (async function () {
      for (let i = 0; i <= tabsLocated.length; i++) {
        tabCount = i;
      }
    })();

    (async function () {
      let appendBtnLocated = await driver.wait(until.elementLocated(By.css(appendBtnCompanies)), TIMEOUT);
      let appendBtn = await driver.wait(until.elementIsVisible(appendBtnLocated), TIMEOUT);
      await appendBtn.click();
    })();

    for (let i = 0; i <= inputsLocated.length - 1; i++) {
      await driver.wait(until.elementIsVisible(inputsLocated[i]), TIMEOUT);
      await inputsLocated[i].sendKeys(fakeData().comment);
      pageInput = i;
      console.log(`This pageInput: ${pageInput}`);
      if(pageInput >= pageIndex - 1) {
        if(page < tabCount - 1) {
          await tabsLocated[page + 1].click();
          await page++;
        }
      }
    }


    // async function driverWaitAndSelectvalue(element) {
    //   const elementsSelect = await driver.wait(
    //     until.elementsLocated(By.css(element)),
    //     TIMEOUT
    //   );
    //   elementsSelect.forEach(async (element) => {
    //     let select = await driver.wait(until.elementIsVisible(element), TIMEOUT);
    //     select.selectedOptions
    //     await select.select("2");
    //   });
    // }

  });
} );