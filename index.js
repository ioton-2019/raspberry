var fetch = require("node-fetch");
var shell = require("shelljs");

function tagPetHash(tagId) {
  const hashMap = {
    d1857943: "5ccdab63e300864b392ff982",
    b5943c2a: "5ccddf9daf182f5684aeaefc"
  };
  return(hashMap[tagId])
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
  // It is exactly what you think it is
  return(shell.exec('nfc-poll').stdout.split('\n')[5].trim().split(':')[1].replace(/ /g,''));
}
const tagId = nfcPoll();
const url = `http://10.100.31.246:8081/api/v1/pets/${tagPetHash(tagId)}`;
const data = {
  id: tagPetHash(tagId),
  lampID: "5ccd93b581645168a984dc36",
  timestamp: new Date().toJSON() 
};
console.log("data", tagPetHash(tagId))
postData(url, data)
  .then(res => console.log(res))
  .catch(err => console.error(err));
