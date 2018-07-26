const LoginBasic = require('../Auth/LoginBasic.spec.js');
const path = require('path');
const driver = require('../driver.js');
const {
    it,
    after,
    before,
    describe
} = require('selenium-webdriver/testing');
const By = require('selenium-webdriver').By;
const until = require('selenium-webdriver').until;

const addClientBtn = require('../../../utils/selectors.js').addClientBtn;
const nameinput = require('../../../utils/selectors.js').nameInputClient;
const countryInputClient = require('../../../utils/selectors.js').countryInputClient;
const cityInputClient = require('../../../utils/selectors.js').cityInputClient;
const addressInputClient = require('../../../utils/selectors.js').addressInputClient;
const wedsiteInputClient = require('../../../utils/selectors.js').wedsiteInputClient;
const commentInputClient = require('../../../utils/selectors.js').commentInputClient;
const createBtnClient = require('../../../utils/selectors.js').createBtnClient;
const suggestionAddress = require('../../../utils/selectors.js').suggestionAddress;
const tabLegalInfo = require('../../../utils/selectors.js').tabLegalInfo;
const suggestionOGRN = require('../../../utils/selectors.js').suggestionOGRN;
const suggestion_inn = require('../../../utils/selectors.js').suggestion_inn;

const fakeData = require('../../../config/fake_data.js');
const clientUrl = require(path.relative('./', '../../../config/login.js')).clientUrl;

describe.only('written moch data in form when create client', function() {
    before(async function() {
        await LoginBasic();
        driver.get(clientUrl);
    });
    after(function() {
        // driver.quit();
    });
    it('write moch data in main section client', function(done) {
        driver.wait(until.elementLocated(By.css(addClientBtn)), 20000).then(element => {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(button => {
            button.click();
        }).finally(done);

        driver.wait(until.elementLocated(By.css(nameinput)), 20000).then(function(element) {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(function(input) {
            input.sendKeys(fakeData().companyName);
        }).catch(function (error) {
            console.log(error);
        });

        driver.wait(until.elementLocated(By.css(countryInputClient)), 20000).then(function (element) {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(function(input) {
            input.sendKeys(fakeData().country);
        }).catch(function (error) {
            console.log(error);
        });
        
        driver.wait(until.elementLocated(By.css(cityInputClient)), 20000).then(function (element) {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(function(input) {
            input.sendKeys(fakeData().city);
        }).catch(function (error) {
            console.log(error);
        });

        driver.wait(until.elementLocated(By.css(addressInputClient)), 20000).then(function (element) {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(function(input) {
            input.sendKeys(fakeData().address);
        }).catch(function (error) {
            console.log(error);
        });

        driver.wait(until.elementLocated(By.name(wedsiteInputClient)), 20000).then(function (element) {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(function(input) {
            input.sendKeys(fakeData().address);
        }).catch(function (error) {
            console.log(error);
        });

        driver.wait(until.elementLocated(By.name(commentInputClient)), 20000).then(function (element) {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(function(input) {
            input.sendKeys(fakeData().comment);
        }).catch(function (error) {
            console.log(error);
        });

        driver.wait(until.elementLocated(By.css(createBtnClient)), 20000).then(element => {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(button => {
            button.getText().then(txt => {
                console.log(txt);
            });
            button.click();
        }).finally(done);
    });

    it.only('write mocha data in legal information client', function (done) {

        driver.wait(until.elementLocated(By.css(addClientBtn)), 20000).then(element => {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(button => {
            button.click();
        }).finally(done);

        driver.wait(until.elementLocated(By.css(tabLegalInfo)), 20000).then(element => {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(button => {
            button.click();
        }).finally(done);

        driver.wait(until.elementLocated(By.css(suggestionAddress)), 20000).then(element => {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(input => {
            input.sendKeys(fakeData().address);
        }).finally(done);

        // driver.wait(until.elementLocated(By.css(suggestionOGRN)), 20000).then(element => {
        //     return driver.wait(until.elementIsVisible(element), 20000);
        // }).then(input => {
        //     input.sendKeys(fakeData().ogrn);
        // }).finally(done);

        driver.wait(until.elementLocated(By.css(suggestion_inn)), 20000).then(element => {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(input => {
            input.sendKeys(fakeData().inn);
        }).finally(done);
    });
});