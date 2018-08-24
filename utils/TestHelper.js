class TestHelper {
  static getRequestUrls(requestEntries) {
    let urls = [];
    requestEntries.forEach(obj => {
      console.log("request url: ", obj.request.url);
      console.log("HTTP method: ", obj.request.method);
      console.log("response status: ",obj.response.status);
      console.log("response status text: ", obj.response.statusText);
      console.log("------------------------");
      urls.push(obj.request.url);
      urls.push(obj.request.method);
    });
    return urls;
  }


  static getManualProxy(port) {
    return {http: "localhost:" + port, https: "localhost:" + port};
  }

  static getObject(obj) {
    console.log("That's har object: " ,obj);
    return obj;
  }

  static getCapabilities(browserName) {
    return {"browserNaeme": browserName, acceptSslCerts: true, acceptInsecureCerts: true};
  }
}

module.exports = TestHelper;