// const webdriver = require('selenium-webdriver');
// const Chrome = require('selenium-webdriver/chrome');
// const By = webdriver.By;
// const until = webdriver.until;
// const expect = require('chai').expect;
// const assert = require('chai').assert;
// const Key = webdriver.Key;
// const WebElement = webdriver.WebElement;
// const optionsChrome = new Chrome.Options();
// const chaiAsPromised = require('chai-as-promised');
// const chai = require('chai');
// const should = chai.should();
// const login = require('../../config/login').login;
// const password = require('../../config/login').password;
// const url = require('../../config/login').baseUrl;
// const nameinput = require('../../utils/selectors.js').nameinput;
// const passinput = require('../../utils/selectors.js').passinput;
// const submitBtn = require('../../utils/selectors.js').submitBtn;
// const chaiWebdriverExec = require('chai-webdriver-exec');


// let driver;

// chai.use(chaiWebdriverExec(driver));

// describe('test for crm2', function() {
//     before(function() {
//         driver = new webdriver.Builder()
//             .withCapabilities(webdriver.Capabilities.chrome())
//             .setChromeOptions(optionsChrome)
//             .build();
//         driver.get(url);
//         console.log('Selenium Webdriver Chrome Started');
//     });

//     after(function() {
//         // driver.quit();
//     });

//     describe('isLogin', function() {
//         it('write valid login', function() {

//             // driver.findElement(By.name(passinput)).sendKeys(password).then((result) => {
//             //     console.log(result);
//             // }).catch((err) => {
//             //     console.log(err);
//             // });
//             driver.findElement(By.css('#Myid')).click()
//                 .then((result) => {
//                     console.log(result);
//                 }).catch((err) => {
//                     console.log(err);
//                 });
//         });

//     });

//     // it('write valid login', function() {
//     //     driver.findElement(By.name(selectors.nameinput)).sendKeys(login);
//     //     driver.findElement(By.name(selectors.passinput)).sendKeys(password);
//     //     driver.findElement(By.css(selectors.submitBtn)).click();
//     // });

//     // it('should work as expected', function() {
//     //     chai.expect('return window.scrollX').to.be.a(1);
//     // });
// });