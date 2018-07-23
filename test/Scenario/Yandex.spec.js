const webdriver = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');
const By = webdriver.By;
// const optionsChrome = new Chrome.Options();
let driver;

describe.only('test for yandex', function() {
    before(function () {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.get('https://www.yandex.ru/');
        console.log('Selenium Webdriver Chrome Started');
    });

    after(function () {
        driver.quit();
    });

    it('search by yandex', function() {
        driver.findElement((By.css('.input__control'))).then((result) => {
            console.log('succes' + result);
        }).catch((err) => {
            console.log(err);
        });
    });
});