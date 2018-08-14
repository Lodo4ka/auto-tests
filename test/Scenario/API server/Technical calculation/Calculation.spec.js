const LoginBasic = require("../../Auth/LoginBasic.spec.js");
const path = require("path");
let driver;
let defaultProxy;
const { it, after, before, describe } = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const until = require("selenium-webdriver").until;
const calculationsUrl = require(path.relative("./", "../../../../config/login.js"))
  .calculationsUrl;
const mlog = require("mocha-logger");
const TIMEOUT = 100000;
const TestHelper = require("../../../../utils/TestHelper");
const chai = require("chai");
let levelLogging = require("selenium-webdriver").logging.Type.BROWSER;
const fakeData = require("../../../../config/fake_data.js");
const formaCompleteProduct = require("../../../../utils/selectors.js").formaCompleteProduct;
const plusGlass = require("../../../../utils/selectors.js").plusGlass;
const glassOption = require("../../../../utils/selectors.js").glassOption;
const tollingCheckbox = require("../../../../utils/selectors.js").tollingCheckbox;
const  assert = chai.assert;

describe.only("written mocha data in technical calculations section", function() {

  before(async function(done) {
    let result = await LoginBasic();
    driver = result.driver;
    defaultProxy = result.defaultProxy;
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

  it.only("write moch data in calculations section", async function() {

    await driver.executeScript(`
      let form = document.querySelector('form[action="/calculations"]');
      form.submit();
    `);

    let page = 0;
    let pageInput = 0;
    let pageIndex = 0;
    let tabCount = 0;

    const inputstextareaNumberLocated = await driver.wait(
      until.elementsLocated(
        By.css(
          "#formCalculationInfo .col-sm-6 input[type=\"number\"], #formCalculationInfo .form-group textarea"
        )
      ),
      TIMEOUT
    );

    const tabsCalculations = await driver.wait(
      until.elementsLocated(By.js(() => {
        let newArray = [];
        let nodeList =  document.querySelectorAll("[data-toggle=\"tab\"]");
        nodeList.forEach(function(element) {
          if(element.parentNode.style.display !== "none" && !element.closest("#divTabGlass")) {
            newArray.push(element);
          }
        });
        return newArray;
      })),
      TIMEOUT
    );

    (async function() {
      const inputsLocated = await driver.wait(
        until.elementsLocated(
          By.css(
            "#formCalculationInfo .col-sm-6 input[type=\"number\"], #formCalculationInfo .form-group textarea"
          )
        ),
        TIMEOUT
      );
      for (let i = 0; i <= inputsLocated.length - 1; i++) {
        await driver
          .wait(until.elementIsVisible(inputstextareaNumberLocated[i]), TIMEOUT)
          .then(bool => {
            if (bool) {
              pageIndex++;
            }
          });
      }
    })();

    (async function() {
      for (let i = 0; i <= tabsCalculations.length; i++) {
        tabCount = i;
      }
    })();

    const optionFormaLocated = await driver.wait(until.elementLocated(By.xpath(formaCompleteProduct)), TIMEOUT);
    const optionFormaVisible = await driver.wait(until.elementIsVisible(optionFormaLocated), TIMEOUT);
    await optionFormaVisible.click();

    for (let i = 0; i <= inputstextareaNumberLocated.length - 1; i++) {
      await driver.wait(until.elementIsVisible(inputstextareaNumberLocated[i]), TIMEOUT);
      await inputstextareaNumberLocated[i].getAttribute("name");
      await inputstextareaNumberLocated[i].sendKeys(fakeData().number);
      pageInput = i;
      if (pageInput >= pageIndex - 1) {
        if (page < tabCount - 1) {
          await tabsCalculations[page + 1].click();
          page++;
        }
      }
    }

    const plusGlassLocated =
      await driver.wait(until.elementLocated(By.css(plusGlass)), TIMEOUT);
    const plusGlassVisible =
      await driver.wait(until.elementIsVisible(plusGlassLocated), TIMEOUT);
    await plusGlassVisible.click();

    const glassOptionlocated =
      await driver.wait(until.elementLocated(By.xpath(glassOption)), TIMEOUT);
    const glassOptionVisible =
      await driver.wait(until.elementIsVisible(glassOptionlocated), TIMEOUT);
    await glassOptionVisible.click();

    await driver.executeScript(`
      let checkbox = document.querySelector('input[name="take"]');
      checkbox.click();
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
});
