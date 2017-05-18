const http = require('http');
const express = require('express');

// module to parse user agent header details
const uaParser = require('ua-parser');

// module to parse language requirements of user
const language = require('accept-language-parser');

const app = express();
const port = process.env.PORT || 3000;

app.enable('trust proxy');

app.get('/api/whoami', (req, res) => {
  // parses user agent header
  const user = uaParser.parse(req.headers['user-agent']);

  // parses browser and version from user-agent header
  const browser = user.ua.toString();

  // parses os and version
  const os = user.os.toString();

  // parses language first choice
  const lang = language.parse(req.headers['accept-language']);
  const langFormat = lang[0] ? `${lang[0].code}-${lang[0].region}` : 'n/a';

  // parses the device of the user
  const device = user.device.family;

  // parses the ip address of user
  const ip = req.ip;

  const result = {
    browser,
    os,
    language: langFormat,
    device,
    ip
  };

  res.json(result);

});

app.listen(port, () => console.log(`listening on port ${port}`));
