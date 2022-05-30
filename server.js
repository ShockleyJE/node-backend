const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const figlet = require("figlet");
const { platform } = require("os");

const HTML_CONTENT_TYPE = "text/html";
const CSS_CONTENT_TYPE = "text/css";
const JS_CONTENT_TYPE = "text/javascript";

class BasicResponse {
  constructor(headCntType, headStatus, data, res) {
    this.headCntType = headCntType;
    this.headStatus = headStatus;
    this.data = data;
    this.res = res;
  }
  return() {
    this.res.writeHead(200, { "Content-Type": this.headCntType });
    this.res.write(this.data);
    this.res.end();
  }
}
class HTMLBasicResponse extends BasicResponse {
  constructor(headStatus, data, res) {
    super(HTML_CONTENT_TYPE, headStatus, data, res);
  }
}
class CSSBasicResponse extends BasicResponse {
  constructor(headStatus, data, res) {
    super(CSS_CONTENT_TYPE, headStatus, data, res);
  }
}
class JSBasicResponse extends BasicResponse {
  constructor(headStatus, data, res) {
    super(JS_CONTENT_TYPE, headStatus, data, res);
  }
}

function rps() {
  rand = Math.random();
  if (rand < 1 / 3) {
    return "rock";
  } else if (rand < 2 / 3) {
    return "paper";
  } else {
    return "scissors";
  }
}

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page === "/") {
    fs.readFile("index.html", function (err, data) {
      let basicRes = new HTMLBasicResponse(200, data, res);
      basicRes.return();
    });
  } else if (page === "/otherpage") {
    fs.readFile("otherpage.html", function (err, data) {
      let basicRes = new HTMLBasicResponse(200, data, res);
      basicRes.return();
    });
  } else if (page === "/coinflip") {
    fs.readFile("coinflip.html", function (err, data) {
      let basicRes = new HTMLBasicResponse(200, data, res);
      basicRes.return();
    });
  } else if (page === "/otherotherpage") {
    fs.readFile("otherotherpage.html", function (err, data) {
      let basicRes = new HTMLBasicResponse(200, data, res);
      basicRes.return();
    });
  } else if (page === "/rockpaperscissors") {
    fs.readFile("rockpaperscissors.html", function (err, data) {
      let basicRes = new HTMLBasicResponse(200, data, res);
      basicRes.return();
    });
  } else if (page === "/rps") {
    if ("choice" in params) {
      let serverChoice = rps();
      let roundResult;
      // resmap[serverchoice][playerchoice] accesses result from player perspective
      let resmap = {
        rock: {
          rock: "tie",
          paper: "win",
          scissors: "lose",
        },
        paper: {
          rock: "lose",
          paper: "tie",
          scissors: "win",
        },
        scissors: {
          rock: "win",
          paper: "lose",
          scissors: "tie",
        },
      };
      const objToJson = {
        computerChoice: serverChoice,
        result: resmap[serverChoice][params["choice"]],
      };
      res.end(JSON.stringify(objToJson));
    }
  } else if (page === "/cf") {
    if ("choice" in params) {
      let serverFlip = (flipRes =
        Math.ceil(Math.random() * 2) === 1 ? "heads" : "tails");
      const objToJson = {
        computerChoice: serverFlip,
        result: params["choice"] === serverFlip ? "win" : "lose",
      };
      res.end(JSON.stringify(objToJson));
    }
  } else if (page === "/api") {
    if ("student" in params) {
      if (params["student"] === "leon") {
        console.log("Hello, I am alive");
        res.writeHead(200, { "Content-Type": "application/json" });
        let flipRes = Math.ceil(Math.random() * 2) === 1 ? "heads" : "tails";
        let rockPaperScissors = rps();
        console.log(rockPaperScissors);
        const objToJson = {
          name: "leon",
          status: "Boss Man",
          currentOccupation: "Baller",
          flip: flipRes,
          rpsResult: rockPaperScissors,
        };
        res.end(JSON.stringify(objToJson));
      } //student = leon
      else if (params["student"] !== "leon") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown",
        };
        res.end(JSON.stringify(objToJson));
      } //student !== leon
    } //student if
  } //else if
  else if (page === "/css/style.css") {
    fs.readFile("css/style.css", function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page === "/js/main.js") {
    fs.readFile("js/main.js", function (err, data) {
      let basicRes = new JSBasicResponse(200, data, res);
      basicRes.return();
    });
  } else if (page === "/js/rockpaperscissors.js") {
    fs.readFile("js/rockpaperscissors.js", function (err, data) {
      let basicRes = new JSBasicResponse(200, data, res);
      basicRes.return();
    });
  } else if (page === "/js/coinflip.js") {
    fs.readFile("js/coinflip.js", function (err, data) {
      let basicRes = new JSBasicResponse(200, data, res);
      basicRes.return();
    });
  } else {
    figlet("404!!", function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
