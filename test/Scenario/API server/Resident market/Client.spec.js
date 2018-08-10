const LoginBasic = require("../../Auth/LoginBasic.spec");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
let driver;
let defaultProxy;
const { it, after, before, describe } = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const until = require("selenium-webdriver").until;
const TIMEOUT = 100000;
const addClientBtn = require("../../../../utils/selectors").addClientBtn;
const fakeData = require("../../../../config/fake_data");
const clientUrl = require("../../../../config/login").clientUrl;
const assert = chai.assert;
const TestHelper = require("../../../../utils/TestHelper");
const mlog = require("mocha-logger");

describe("written moch data in form when create client", function() {
  before(async function(done) {
    let result =  await LoginBasic();
    driver = result.driver;
    defaultProxy = result.defaultProxy;
    await driver.get(clientUrl);
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

  it("write moch data in client section", async function() {

    let page = 0;
    let pageInput = 0;
    let pageIndex = 0;
    let tabCount = 0;

    const elementFirst = await driver.wait(
      until.elementLocated(By.css(addClientBtn)),
      TIMEOUT
    );
    const buttonFirst = await driver.wait(
      until.elementIsVisible(elementFirst),
      TIMEOUT
    );
    await buttonFirst.click();

    const elementsSecond = await driver.wait(
      until.elementsLocated(
        By.css(
          ".modal-content form input:not([type=hidden]), .modal-content form textarea"
        )
      ),
      TIMEOUT
    );
    
    const elementsThird = await driver.wait(
      until.elementsLocated(By.css("[data-toggle=\"tab\"]")),
      TIMEOUT
    );

    (async function() {
      const elementsThird = await driver.wait(
        until.elementsLocated(
          By.css(
            ".modal-content form input:not([type=hidden]), .modal-content form textarea"
          )
        ),
        TIMEOUT
      );
      for (let i = 0; i <= elementsThird.length - 1; i++) {
        await driver
          .wait(until.elementIsVisible(elementsSecond[i]), TIMEOUT)
          .then(bool => {
            if (bool) {
              pageIndex++;
            }
          });
      }
    })();

    (async function() {
      for (let i = 0; i <= elementsThird.length; i++) {
        tabCount = i;
      }
    })();

    for (let i = 0; i <= elementsSecond.length - 1; i++) {
      await driver.wait(until.elementIsVisible(elementsSecond[i]), TIMEOUT);
      await elementsSecond[i].getAttribute("name");
      await elementsSecond[i].sendKeys(fakeData().comment);
      pageInput = i;
      if (pageInput >= pageIndex - 1) {
        if (page < tabCount - 1) {
          await elementsThird[page + 1].click();
          page++;
        }
      }
    }

    const elementEight = await driver
      .wait(
        until.elementLocated(By.css(".modal-content form .btn-group button")),
        TIMEOUT
      );

    await driver.wait(
      until.elementIsVisible(elementEight),
      TIMEOUT
    )
      .then(async () => {
        await driver.executeScript(`
          let button = document.querySelector('.btn-group .btn.btn-success');
          let form = document.querySelector('.modal-content .form-horizontal');
          form.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log('form submitted');
            // form.submit();
          });
          // button.click(); 
          form.submit();
          `);
        let har = await defaultProxy.getHar();
        TestHelper.getRequestUrls(har.log.entries);
        assert.isOk((har.log.entries.filter(element => {
          return element.request.method === "POST"
            && element.request.url === "http://crm2.local/api/sales/resident/clients";
        })).length !== 0, mlog.success("test pass!!"));
      });
  });
});
