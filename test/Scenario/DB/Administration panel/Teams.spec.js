const LoginBasic = require("../../Auth/LoginBasic.spec.js");
const path = require("path");
let driver;
let defaultProxy;
const {
  it,
  after,
  before,
  describe
} = require("selenium-webdriver/testing");
const By = require("selenium-webdriver").By;
const until = require("selenium-webdriver").until;
const adminUrl = require(path.relative("./", "../../../../config/login.js"))
  .adminUrl;
const TIMEOUT = 100000;
const chai = require("chai");
const fakeData = require("../../../../config/fake_data.js");
const btnTeam = require("../../../../utils/selectors.js").btnTeam;
const inputTeams = require("../../../../utils/selectors.js").inputDepartment;
const beginTeamBtn = require("../../../../utils/selectors.js").beginTeamBtn;
const textareaDepartment = require("../../../../utils/selectors.js").textareaDepartment;
const btnSuccesOther = require("../../../../utils/selectors.js").btnSuccesOther;
const saveBtnDepartment = require("../../../../utils/selectors.js").saveBtnDepartment;
const TestHelper = require("../../../../utils/TestHelper");
const assert = chai.assert;
let connection;


describe.only("check DB admin/teams", function () {

  before(async function (done) {
    let result = await LoginBasic();
    driver = result.driver;
    defaultProxy = result.defaultProxy;
    connection = result.connection;
    await driver.get(adminUrl);
    await driver
      .manage()
      .window()
      .maximize();
    done();
  });

  after(async function (done) {
    await defaultProxy.closeProxies();
    await defaultProxy.end();
    // await driver.close();
    // await driver.quit();
    await connection.end();
    await done();
  });

  it.only("write to DB teams", async function () {

    let beforeId = 0;
    let afterId = 0;
    let status = "";

    connection.query("SELECT * FROM teams ORDER BY team_id DESC LIMIT 1", function (error, result) {
      if (error) {
        throw error;
      }
      beforeId = result[0].team_id;
    });

    const  linkTerritoryLocated
    = await driver.wait(until.elementLocated(By.css(beginTeamBtn)), TIMEOUT);
    const  linkTerritoryVisible
    = await driver.wait(until.elementIsVisible(linkTerritoryLocated), TIMEOUT);
    await linkTerritoryVisible.click();

    const  addTeamBtnLocated
    = await driver.wait(until.elementLocated(By.css(btnTeam)), TIMEOUT);
    const  ddTeamBtnVisible
    = await driver.wait(until.elementIsVisible(addTeamBtnLocated), TIMEOUT);
    await ddTeamBtnVisible.click();

    const  inputNameLocated
    = await driver.wait(until.elementLocated(By.css(inputTeams)), TIMEOUT);
    const  inputNameVisible
    = await driver.wait(until.elementIsVisible(inputNameLocated), TIMEOUT);
    await inputNameVisible.sendKeys(fakeData().department);

    const textareaLocated
    = await driver.wait(until.elementLocated(By.css(textareaDepartment)), TIMEOUT);
    const textareaVisible
    = await driver.wait(until.elementIsVisible(textareaLocated), TIMEOUT);
    await textareaVisible.sendKeys(fakeData().departmentOther);

    const btnSuccesLocated = await driver.wait(until.elementLocated(By.css(btnSuccesOther)), TIMEOUT);
    const btnSuccesVisible = await driver.wait(until.elementIsVisible(btnSuccesLocated), TIMEOUT);
    await btnSuccesVisible.click();

    await connection.query("SELECT * FROM teams ORDER BY team_id DESC LIMIT 1", async function (error, result) {
      if (error) {
        throw error;
      }
      afterId = result[0].team_id;
      status = result[0].status;
      await assert.isOk(beforeId + 1 === afterId, "id is incremented");
      await assert.isOk(status === "active", "the entry was created");
    });
  });
});