const LoginBasic = require("../Auth/LoginBasic.spec.js");
const chai = require("chai");
const assert = require("chai").assert;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const path = require("path");
let driver;
if (process.env.driver === "firefox") {
  driver = require("../driverFirefox.js");
}
if (process.env.driver === "chrome") {
  driver = require("../driverChrome.js");
}
const { it, after, before, describe } = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const until = require("selenium-webdriver").until;
const TIMEOUT = 100000;
const saveBtnSeasonality = require("../../../utils/selectors.js")
  .saveBtnSeasonality;
const inputsSeasonality = require("../../../utils/selectors.js")
  .inputsSeasonality;
const fakeData = require("../../../config/fake_data.js");
const seasonUrl = require(path.relative("./", "../../../config/login.js"))
  .seasonUrl;
let levelLogging = require("selenium-webdriver").logging.Type.BROWSER;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("written data in form in section seasonality", function() {
  before(async function(done) {
    await LoginBasic();
    await driver.get(seasonUrl);
    // await driver.manage().window().maximize();
    done();
  });
  after(async function() {
    await driver.close();
    await driver.quit();
  });

  it("write data and submit and check API server", async function() {
    const inputs = await driver.wait(
      until.elementsLocated(By.css(inputsSeasonality)),
      TIMEOUT
    );
    for (let i = 0; i <= inputs.length - 1; i++) {
      let name_ = await inputs[i].getAttribute("name");
      console.log(name_);
      driver
        .executeScript(
          "var input = document.getElementsByName(\"" +
            name_ +
            "\")[0]; console.log('work'); input.scrollIntoView();"
        )
        .then(async () => {
          driver.wait(until.elementIsVisible(inputs[i]), TIMEOUT);
          inputs[i].sendKeys("0");
        });
    }
  });
});
