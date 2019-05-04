var fetch = require("node-fetch");
var shell = require("shelljs");

const url = "http://10.100.31.246:8081/api/v1/pets/5ccdab63e300864b392ff982";
const data = {
  id: "5ccdab63e300864b392ff982",
  lampID: "5ccd93b581645168a984dc36",
  timestamp: new Date().toJSON()
};
function postData(url = ``, data = {}) {
  return fetch(url, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(data)
  }).then(response => response.json());
}

function nfcPoll() {
  console.log(shell.exec('nfc-poll'));
}
postData(url, data)
  .then(res => console.log(res))
  .catch(err => console.error(err));
