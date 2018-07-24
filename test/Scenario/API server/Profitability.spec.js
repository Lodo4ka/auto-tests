const LoginBasic = require('../Auth/LoginBasic.spec.js');
const path = require('path');
const driver = require('../driver.js');
const {
    it,
    after,
    before,
    describe
} = require('selenium-webdriver/testing');
const linkCreateReport = require('../../../utils/selectors.js').linkCreateReport;
const By = require('selenium-webdriver').By;
const until = require('selenium-webdriver').until;
const contrAgent = require('../../../utils/selectors.js').contrAgentName;
const contrDateFrom = require('../../../utils/selectors.js').contrDateFrom;
const contrDateTo = require('../../../utils/selectors.js').contrDateTo;
const residentUrl = require(path.relative('./', '../../../config/login.js')).residentUrl;
const fakeData = require('../../../config/fake_data.js');


describe.only('written moch data in form', function() {
    before(async function() {
        await LoginBasic();
        console.log('--------------------------------------------');
        driver.get(residentUrl);
    });

    after(function() {
        // driver.quit();
    });

    it('write moch data',async function() {
        let click = await driver.wait(until.elementLocated(By.css(linkCreateReport)), 2000);
        click.click();
        this.timeout(5000);
        let name =  await driver.wait(until.elementLocated(By.css(contrAgent)), 2000);
        name.sendKeys(fakeData().contrAgentname);
        // driver.wait(until.elementLocated(By.css(contrDateFrom)), 5000).sendKeys(fakeData().contrAgentDataFrom).then(function () {
        // }).catch(function(error) {
        //     console.log(error);
        // });
        // driver.wait(until.elementLocated(By.css(contrDateTo)), 5000).sendKeys(fakeData().contrAgentDataTo).then(function () {
        // }).catch(function(error) {
        //     console.log(error);
        // });
    });
});