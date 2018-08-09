const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const path = require("path");
let driver;
const {
  it,
  after,
  before,
  describe
} = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const until = require("selenium-webdriver").until;
const TIMEOUT = 100000;
const addClientBtn = require("../../../utils/selectors.js").addClientBtn;
const fakeData = require("../../../config/fake_data.js");
const clientUrl = require(path.relative("./", "../../../config/login.js"))
  .clientUrl;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const assert = chai.assert;
const expect = chai.expect;
const selProxy = require("selenium-webdriver/proxy");
const nameInput = require("../../../utils/selectors.js").nameinput;
const passInput = require("../../../utils/selectors.js").passinput;
const submitBtn = require("../../../utils/selectors.js").submitBtn;
const login = require(path.relative("./", "../../../config/login.js")).login;
const url = require(path.relative("./", "../../../config/login.js")).baseUrl;
const password = require(path.relative("./", "../../../config/login.js")).password;
const BrowserMob = require("browsermob-proxy-client");
let defaultProxy;
const webdriver = require("selenium-webdriver");

describe.only("written moch data in form when create client", function () {
  let scriptToExecute =
    `var performance = window.performance ||
    window.mozPerformance ||
    window.msPerformance || window.webkitPerformance || {};
    var network = performance.getEntries() || {};
    return network;`;

  before(async function (done) {
    defaultProxy = BrowserMob.createClient();
    await defaultProxy.start();
    await defaultProxy.createHar();
    driver = new webdriver.Builder()
      .withCapabilities({
        "browserName": "chrome",
        acceptSslCerts: true,
        acceptInsecureCerts: true
      })
      .setProxy(selProxy.manual({
        http: "localhost:" + defaultProxy.proxy.port,
        https: "localhost:" + defaultProxy.proxy.port
      }))
      .forBrowser("chrome")
      .build();

    await driver.get(clientUrl);
    await driver
      .manage()
      .window()
      .maximize();
    // await driver.manage().deleteAllCookies();
    done();
  });
  after(async function () {
    // await driver.close();
    // await driver.quit();
    // await defaultProxy.closeProxies();
    // await defaultProxy.end();
  });

  it.only("Login Basic", async function() {
    driver.get(url);
    await driver.findElement(By.name(nameInput)).sendKeys(login);
    await driver.findElement(By.name(passInput)).sendKeys(password);
    await driver.findElement(By.css(submitBtn)).click();
  });

  it.only("write moch data in client section", async function () {

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


    // const elementsSecond = await driver.wait(
    //   until.elementsLocated(
    //     By.css(
    //       ".modal-content form input:not([type=hidden]), .modal-content form textarea"
    //     )
    //   ),
    //   TIMEOUT
    // );
    // const elementsThird = await driver.wait(
    //   until.elementsLocated(By.css("[data-toggle=\"tab\"]")),
    //   TIMEOUT
    // );
    //
    // (async function() {
    //   const elementsThird = await driver.wait(
    //     until.elementsLocated(
    //       By.css(
    //         ".modal-content form input:not([type=hidden]), .modal-content form textarea"
    //       )
    //     ),
    //     TIMEOUT
    //   );
    //   for (let i = 0; i <= elementsThird.length - 1; i++) {
    //     await driver
    //       .wait(until.elementIsVisible(elementsSecond[i]), TIMEOUT)
    //       .then(bool => {
    //         if (bool) {
    //           pageIndex++;
    //           console.log(`pageIndex is ${pageIndex}`);
    //         }
    //       });
    //   }
    // })();
    //
    // (async function() {
    //   for (let i = 0; i <= elementsThird.length; i++) {
    //     tabCount = i;
    //   }
    //   console.log(`tab count = ${tabCount}`);
    // })();
    //
    // for (let i = 0; i <= elementsSecond.length - 1; i++) {
    //   await driver.wait(until.elementIsVisible(elementsSecond[i]), TIMEOUT);
    //   await elementsSecond[i].getAttribute("name");
    //   await elementsSecond[i].sendKeys(fakeData().comment);
    //   pageInput = i;
    //   console.log(`This is pageInput:${pageInput}`);
    //   if (pageInput >= pageIndex - 1) {
    //     if (page < tabCount - 1) {
    //       await elementsThird[page + 1].click();
    //       page++;
    //     }
    //   }
    // }

    const elementEight = await driver
      .wait(
        until.elementLocated(By.css(".modal-content form .btn-group button")),
        TIMEOUT
      );

    driver.wait(
      until.elementIsVisible(elementEight),
      TIMEOUT
    ).then(() => {
      driver.executeScript(
        `let form = document.querySelector('.modal-content .form-horizontal');
      console.log(form);
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('form submitted');
        form.submit();
      });
      form.submit();
      `);
    });

    let har = await defaultProxy.getHar();
    getRequestUrls(har.log.entries);

    // .then(() => {
    //   chai.request('http://crm2.local/')
    //     .get('sections/sales/resident/clients')
    //     .end((error, res) => {
    //       res.body.should.have.status(200);
    //       done();
    //     });
    // });


    // await driver.executeScript(
    //   `let form = document.querySelector('.modal-content .form-horizontal');
    //   console.log(form);
    //   form.addEventListener('submit', function (event) {
    //     event.preventDefault();
    //     console.log('form submitted');
    //     form.submit();
    //   });`
    // );

    // await driver.executeScript(scriptToExecute);
    // let logs =  await driver.manage().logs().get(levelLogging);
    // await console.log(logs);

  });


  function getRequestUrls(requestEntries) {
    let urls = [];
    requestEntries.forEach(obj => {
      console.log("request: ", obj.request.url);
      console.log("HTTP method: ", obj.request.method);
    });
    return urls;
  }

});
