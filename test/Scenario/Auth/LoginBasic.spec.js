const path = require("path");
let initDriver;
if(process.env.driver === "firefox") {
  // driver = require("../driverFirefox.js");
}
if(process.env.driver === "chrome") {
  // driver = require("../driverChrome.js").driver;
  initDriver = require("../driverChrome.js").initDriver;
}
const By = require("selenium-webdriver").By;
const nameInput = require("../../../utils/selectors.js").nameinput;
const passInput = require("../../../utils/selectors.js").passinput;
const submitBtn = require("../../../utils/selectors.js").submitBtn;
const login = require(path.relative("./", "../../../config/login.js")).login;
const url = require(path.relative("./", "../../../config/login.js")).baseUrl;
const password = require(path.relative("./", "../../../config/login.js")).password;

module.exports = async function LoginBasic() {
  let result = await initDriver();
  let {driver, defaultProxy} = result;
  driver.get(url);
  await driver.findElement(By.name(nameInput)).sendKeys(login);
  await driver.findElement(By.name(passInput)).sendKeys(password);
  await driver.findElement(By.css(submitBtn)).click();
  return {driver, defaultProxy};
};