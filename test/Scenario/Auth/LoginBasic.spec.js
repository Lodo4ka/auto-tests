const path = require('path');
const driver = require('../driver.js');
const By = require('selenium-webdriver').By;
const nameInput = require('../../../utils/selectors.js').nameinput;
const passInput = require('../../../utils/selectors.js').passinput;
const submitBtn = require('../../../utils/selectors.js').submitBtn;
const login = require(path.relative('./', '../../../config/login.js')).login;
const url = require(path.relative('./', '../../../config/login.js')).baseUrl;
const password = require(path.relative('./', '../../../config/login.js')).password;

module.exports = async function LoginBasic() {
    driver.get(url);
    await driver.findElement(By.name(nameInput)).sendKeys(login);
    await driver.findElement(By.name(passInput)).sendKeys(password);
    return await driver.findElement(By.css(submitBtn)).click();
};