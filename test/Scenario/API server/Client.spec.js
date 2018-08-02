const LoginBasic = require('../Auth/LoginBasic.spec.js');
const chai = require('chai');
const assert = require('chai').assert;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const path = require('path');
let driver;
if (process.env.driver === 'firefox') {
  driver = require('../driverFirefox.js');
}
if (process.env.driver === 'chrome') {
  driver = require('../driverChrome.js');
}
const {
  it,
  after,
  before,
  describe,
} = require('selenium-webdriver/testing');
const By = require('selenium-webdriver').By;
const until = require('selenium-webdriver').until;
const TIMEOUT = 100000;
const addClientBtn = require('../../../utils/selectors.js').addClientBtn;
const fakeData = require('../../../config/fake_data.js');
const clientUrl = require(path.relative('./', '../../../config/login.js')).clientUrl;
let levelLogging = require('selenium-webdriver').logging.Type.BROWSER;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe.only('written moch data in form when create client', function () {
  let scriptToExecute = 'var performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {}; var network = performance.getEntries() || {}; return network;';

  before(async function (done) {
    await LoginBasic();
    driver.get(clientUrl);
    done();
  });
  after(function (done) {
    driver.quit().then(done);
  });


  it.only('write moch data in client section', async function (done) {
    let page = 0;
    let pageInput = 0;
    let pageIndex = 0;
    let tabCount = 0;

    const elementFirst = await driver.wait(until.elementLocated(By.css(addClientBtn)), TIMEOUT);
    const buttonFirst = await driver.wait(until.elementIsVisible(elementFirst), TIMEOUT);
    await buttonFirst.click();
    const elementsSecond = await driver.wait(until.elementsLocated(By.css('.modal-content form input:not([type=hidden]), .modal-content form textarea')), TIMEOUT);
    const elementsThird = await driver.wait(until.elementsLocated(By.css('[data-toggle="tab"]')), TIMEOUT);

    (async function () {
      const elementsThird = await driver.wait(until.elementsLocated(By.css('.modal-content form input:not([type=hidden]), .modal-content form textarea')), TIMEOUT);
      for (let i = 0; i <= elementsThird.length - 1; i++) {
        await driver.wait(until.elementIsVisible(elementsSecond[i]), TIMEOUT).then(bool => {
          if (bool) {
            pageIndex++;
            console.log(`pageIndex is ${pageIndex}`);
          }
        });
      }
    })();

    (async function () {
      for (let i = 0; i <= elementsThird.length; i++) {
        tabCount = i;
      }
      console.log(`tab count = ${tabCount}`);
    })();


    for (let i = 0; i <= elementsSecond.length - 1; i++) {
      await driver.wait(until.elementIsVisible(elementsSecond[i]), TIMEOUT);
      await elementsSecond[i].getAttribute('name');
      await elementsSecond[i].sendKeys(fakeData().comment).catch(error => {
        console.log(error);
      });
      pageInput = i;
      console.log(`This is pageInput:${pageInput}`);
      if (pageInput >= pageIndex - 1) {
        if (page < tabCount - 1) {
          await elementsThird[page + 1].click();
          page++;
        }
      }
    }
    const elementEight = await driver.wait(until.elementLocated(By.css('.modal-content form .btn-group button')), TIMEOUT)
      .catch(error => {
        console.log(error);
      });
    const inputEight = await driver.wait(until.elementIsVisible(elementEight), TIMEOUT);
    await inputEight.getText().then(txt => {
      assert.equal(txt, 'Добавить');
    }).then(() => {
      chai.request('http://crm2.local/')
        .get('sections/sales/resident/clients')
        .end((error, res) => {
          res.body.should.have.status(200);
          done();
        });
    });
    await inputEight.click();
    await driver.executeScript(scriptToExecute);
    let logs =  await driver.manage().logs().get(levelLogging);
    await console.log(logs);
  });
});

