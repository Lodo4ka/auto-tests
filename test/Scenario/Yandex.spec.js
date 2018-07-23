const webdriver = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');
const { it, after, before, describe } = require('selenium-webdriver/testing');
const util = webdriver.until;
const By = webdriver.By;
// const optionsChrome = new Chrome.Options();
let driver;
// describe.only('test for yandex', function() {
//     before(function() {
//         driver = new webdriver.Builder()
//             .forBrowser('chrome')
//             .build();
//         driver.get('https://www.yandex.ru/');
//         console.log('Selenium Webdriver Chrome Started');
//     });

//     after(function() {
//         driver.quit();
//     });

//     it('search by yandex', function() {
//         driver.findElement((By.css('#text'))).then((result) => {
//             console.log('succes' + result);
//         }).catch((err) => {
//             console.log(err);
//         });
//     });
// });

describe('test for yandex', () => {
    before(function() {
        this.timeout(15000);
        driver = new webdriver.Builder().forBrowser('chrome').build();
        driver.get('https://www.yandex.ru/');
    });

    after(function() {
        driver.quit();
    });

    it('search for yandex', function(done) {
        this.timeout(15000);
        setTimeout(done, 15000);
        driver.findElement(By.css('#text')).sendKeys('bla').then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
        driver.findElement(By.css('button[type="submit"]')).click().then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    });
});