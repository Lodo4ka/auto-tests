const LoginBasic = require('../Auth/LoginBasic.spec.js');
// const fs = require('fs');
const path = require( 'path' );
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
    describe
} = require( 'selenium-webdriver/testing' );

const By = require( 'selenium-webdriver' ).By;
const until = require( 'selenium-webdriver' ).until;

const contrAgent = require( '../../../utils/selectors.js' ).contrAgentName;
const contrDateFrom = require( '../../../utils/selectors.js' ).contrDateFrom;
const contrDateTo = require( '../../../utils/selectors.js' ).contrDateTo;
const createBtn = require('../../../utils/selectors.js').createBtn;
const buttonCreateReport = require('../../../utils/selectors.js').buttonCreateReport;

const residentUrl = require( path.relative( './', '../../../config/login.js' ) ).residentUrl;
const fakeData = require( '../../../config/fake_data.js' );


describe( 'written moch data in form', function() {
    before( async function() {
        await LoginBasic();
        console.log( '--------------------------------------------' );
        driver.get(residentUrl);
    } );

    after( function() {
        driver.quit();
    } );
    
    it('write moch data in profitability', function () {
        driver.wait(until.elementLocated(By.css(buttonCreateReport)), 20000)
            .then(function( element) {
                return driver.wait(until.elementIsVisible(element), 20000);
            }).then( function(button) {
                button.click(); 
            });

        driver.wait(until.elementLocated(By.css(contrAgent)), 20000).then(element => {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(function(input) {
            input.sendKeys(fakeData().contrAgentname);
        }).catch(function(error) {
            console.log(error);
        });

        driver.wait(until.elementLocated(By.name(contrDateFrom)), 20000).then(element => {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(input => {
            input.sendKeys(fakeData().contrAgentDataFrom);
        }).catch(function(error) {
            console.log(error);
        });

        driver.wait(until.elementLocated(By.name(contrDateTo)), 20000).then(element => {
            return driver.wait(until.elementIsVisible(element), 20000);
        }).then(input => {
            input.sendKeys(fakeData().contrAgentDataTo);
        }).catch(function(error) {
            console.log(error);
        });

        driver.wait(until.elementLocated(By.css(createBtn)), 20000)
            .then(function (element) {
                return driver.wait(until.elementIsVisible(element), 20000);
            }).then(function (button) {
                // this hack for click button
                driver.actions().mouseMove(button).mouseUp().mouseDown();
                // button.click();
            }).catch(function (error) {
                console.log(error);
            });

            
        // driver.takeScreenshot().then(function (data) {
        //     var base64Data = data.replace(/^data:image\/png;base64,/, '');
        //     fs.writeFile('out.png', base64Data, 'base64', function (err) {
        //         if (err) console.log(err);
        //     });
        // });
    });
} );