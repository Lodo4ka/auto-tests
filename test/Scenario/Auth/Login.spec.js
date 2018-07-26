const path = require('path');
const webdriver = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');
const {
    it,
    after,
    before,
    describe
} = require('selenium-webdriver/testing');
const util = webdriver.until;
const By = webdriver.By;
const optionsChrome = new Chrome.Options();
const url = require(path.relative('./', '../../../config/login.js')).baseUrl;
let driver;
const nameInput = require('../../../utils/selectors.js').nameinput;
const passInput = require('../../../utils/selectors.js').passinput;
const submitBtn = require('../../../utils/selectors.js').submitBtn;
const aSubmit = require('../../../utils/selectors.js').aSubmit;
const login = require(path.relative('./', '../../../config/login.js')).login;
const password = require(path.relative('./', '../../../config/login.js')).password;
const fakeData = require(path.relative('./', '../../../config/fake_data.js'));
const wdio = require('webdriverio');
const browser = wdio.remote({
    desiredCapabilities: {
        browserName: 'chrome'
    }
});


describe('login into home page', function () {
    before(function () {
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .setChromeOptions(optionsChrome)
            .forBrowser('chrome').build();
        driver.get(url);
        console.log('Selenium Webdriver Chrome Started');
    });

    after(function () {
        driver.quit();
    });

    it('login into crm2', function (done) {
        driver.findElement(By.name(nameInput)).sendKeys(login).then(function () {
        }).catch(function (error) {
            console.log(error);
        });
        driver.findElement(By.name(passInput)).sendKeys(password).then(function () {

        });
        driver.findElement(By.css(submitBtn)).click().then(function () {

        }).finally(done);
    });

    it('should receive values from session storage', function () {

        driver.executeScript('return window.sessionStorage.getItem(\'blockIsDisActive\')').then(function (result) {
            console.log(result);
        }).catch(function (error) {
            console.log(error);
        });
    });

    it('logout crm2', function () {
        driver.findElement(By.css(aSubmit)).click();
    });

    it('check sessionStorage after logout', function () {
        driver.executeScript('return window.sessionStorage.getItem(\'blockIsDisActive\')').then(function () {

        }).catch(function (error) {
            console.log(error);
        });
    });
});

