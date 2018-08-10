class TestHelper {
  static getRequestUrls(requestEntries) {
    let urls = [];
    requestEntries.forEach(obj => {
      console.log("request: ", obj.request.url);
      console.log("HTTP method: ", obj.request.method);
      console.log("------------------------");
      urls.push(obj.request.url);
      urls.push(obj.request.method);
    });
    return urls;
  }

  static getManualProxy(port) {
    return {http: "localhost:" + port, https: "localhost:" + port};
  }

  static getCapabilities(browserName) {
    return {"browserNaeme": browserName, acceptSslCerts: true, acceptInsecureCerts: true};
  }
}

module.exports = TestHelper;