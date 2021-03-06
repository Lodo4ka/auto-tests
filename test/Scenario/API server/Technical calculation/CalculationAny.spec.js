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
const plusGlass = require("../../../../utils/selectors.js").plusGlass;
const glassOption = require("../../../../utils/selectors.js").glassOption;
const buttonAddGlass = require("../../../../utils/selectors.js").buttonAddGlass;
const triplexBtn = require("../../../../utils/selectors.js").triplexBtn;
const nameInput = require("../../../../utils/selectors.js").nameInput;
const glass1Option = require("../../../../utils/selectors.js").glass1Option;
const plenka1Option = require("../../../../utils/selectors.js").plenka1Option;
const glass2Option = require("../../../../utils/selectors.js").glass2Option;
const plenka2Option = require("../../../../utils/selectors.js").plenka2Option;
const glass3Option = require("../../../../utils/selectors.js").glass3Option;
const buttonAddTriplex = require("../../../../utils/selectors.js").buttonAddTriplex;
const btnDeleteTriplex = require("../../../../utils/selectors.js").btnDeleteTriplex;
const btnDeleteTriplexConfirm = require("../../../../utils/selectors.js").btnDeleteTriplexConfirm;
const btnClimaGuardConfirm = require("../../../../utils/selectors.js").btnClimaGuardConfirm;
const  assert = chai.assert;


describe("written mocha data in technical calculations section", function() {

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
    await done();
  });

  it("write moch data in calculations any section and check HTTP POST query", async function() {
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

    const addBtnLocated =
      await driver.wait(until.elementLocated(By.css(buttonAddGlass)), TIMEOUT);
    const addBtnVisible =
      await driver.wait(until.elementIsVisible(addBtnLocated), TIMEOUT);
    await addBtnVisible.click();

    const triplexBtnLocated =
      await driver.wait(until.elementLocated(By.xpath(triplexBtn)), TIMEOUT);
    const triplexBtnVisible =
      await driver.wait(until.elementIsVisible(triplexBtnLocated), TIMEOUT);
    await triplexBtnVisible.click();

    const nameInputLocated =
      await driver.wait(until.elementLocated(By.xpath(nameInput)), TIMEOUT);
    const nameInputVisible =
      await driver.wait(until.elementIsVisible(nameInputLocated), TIMEOUT);
    await nameInputVisible.sendKeys(fakeData().companyName);

    const glass1OptionLocated =
      await driver.wait(until.elementLocated(By.xpath(glass1Option)), TIMEOUT);
    const glass1OptionVisible =
      await driver.wait(until.elementIsVisible(glass1OptionLocated), TIMEOUT);
    await glass1OptionVisible.click();

    const plenka1OptionLocated =
      await driver.wait(until.elementLocated(By.xpath(plenka1Option)), TIMEOUT);
    const plenka1OptionVisible =
      await driver.wait(until.elementIsVisible(plenka1OptionLocated), TIMEOUT);
    await plenka1OptionVisible.click();

    const glass2OptionLocated =
      await driver.wait(until.elementLocated(By.xpath(glass2Option)), TIMEOUT);
    const glass2OptionVisible =
      await driver.wait(until.elementIsVisible(glass2OptionLocated), TIMEOUT);
    await glass2OptionVisible.click();

    const plenka2OptionLocated =
      await driver.wait(until.elementLocated(By.xpath(plenka2Option)), TIMEOUT);
    const plenka2OptionVisible =
      await driver.wait(until.elementIsVisible(plenka2OptionLocated), TIMEOUT);
    await plenka2OptionVisible.click();

    const glass3OptionLocated =
      await driver.wait(until.elementLocated(By.xpath(glass3Option)), TIMEOUT);
    const glass3OptionVisible =
      await driver.wait(until.elementIsVisible(glass3OptionLocated), TIMEOUT);
    await glass3OptionVisible.click();

    const buttonAddTriplexLocated =
      await driver.wait(until.elementLocated(By.css(buttonAddTriplex)), TIMEOUT);
    const buttonAddTriplexVisible =
      await driver.wait(until.elementIsVisible(buttonAddTriplexLocated), TIMEOUT);
    await buttonAddTriplexVisible.click();

    await driver.executeScript(`
      let select = document.querySelector("#selectWindowsStructurals");
      let option = select[select.length - 1];
      option.setAttribute("selected", true);
    `);

    await driver.executeScript(`
      const addGLassPacket = document.querySelector("a[data-target='#modalGlassPackagings']");
      addGLassPacket.click();
    `);

    await driver.executeScript(`
      const addPack = document.querySelector("#divModals #modalGlassPackagings tr:nth-of-type(3) [data-hash]");
      addPack.click();
    `);

    await driver.executeScript(`
      let addArrived = document.querySelector("#divDelivery [data-toggle]");
      addArrived.click();
    `);

    await driver.executeScript(`
      const inputCostCar =  document.querySelector("input[placeholder='Стоимость машины для клиента']");
      inputCostCar.value = 100;
    `);

    await driver.executeScript(`
      const inputBulkCar = document.querySelector("input[placeholder='Объём 1-й машины, м2'");
      inputBulkCar.value = 100;
    `);

    await driver.executeScript(`
      const buttonAddDelivery =  document.querySelector("#buttonAddDelivery");
      buttonAddDelivery.click();
    `);

    let har = await defaultProxy.getHar();
    console.log("Logs from browsermob:");
    TestHelper.getRequestUrls(har.log.entries);

    assert.isOk((har.log.entries.filter(obj => {
      return  obj.request.method === "POST" && obj.request.url === "http://crm2.local/login"
        && obj.response.status === 302 && obj.response.statusText === "Found";
    })).length !== 0, "test pass POST http://crm2.local/login!!");

    assert.isOk((har.log.entries.filter(obj => {
      return  obj.request.method === "POST" && obj.request.url === "http://crm2.local/calculations"
        && obj.response.status === 302 && obj.response.statusText === "Found";
    })).length !== 0, "test pass POST http://crm2.local/calculations!!");

    assert.isOk((har.log.entries.filter(obj => {
      return  obj.request.method === "POST" && obj.request.url === "http://crm2.local/calculations/add/glass"
        && obj.response.status === 200 && obj.response.statusText === "OK";
    })).length !== 0, "test pass POST http://crm2.local/calculations/add/glass!!");

    assert.isOk((har.log.entries.filter(obj => {
      return  obj.request.method === "POST" && obj.request.url === "http://crm2.local/calculations/triplex"
        && obj.response.status === 200 && obj.response.statusText === "OK";
    })).length !== 0, "test pass POST http://crm2.local/calculations/triplex!!");

    assert.isOk((har.log.entries.filter(obj => {
      return  obj.request.method === "POST" && obj.request.url === "http://crm2.local/calculations/packagings"
        && obj.response.status === 200 && obj.response.statusText === "OK";
    })).length !== 0, "test pass POST http://crm2.local/calculations/packagings!!");

    assert.isOk((har.log.entries.filter(obj => {
      return  obj.request.method === "POST" && obj.request.url === "http://crm2.local/calculations/delivery";
    })).length !== 0, "test pass POST http://crm2.local/calculations/delivery!!");
  });
});