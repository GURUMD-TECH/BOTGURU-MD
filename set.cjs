// GURU TECH //
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "Guru md~VnwCHPvP",
  HEROKU_API_TOKEN: process.env.HEROKU_API_TOKEN || "HRKU-0a1fe665-8a35-42e8-b7ad-761f25ffe195",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  KOYEB_API_TOKEN: process.env.KOYEB_API_TOKEN || "",
  KOYEB_APP_NAME: process.env.KOYEB_APP_NAME || "",
  DEPLOYMENT_PLATFORM: process.env.DEPLOYMENT_PLATFORM || "",
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DOWNLOAD: process.env.AUTO_DOWNLOAD !== undefined ? process.env.AUTO_DL === 'true' : true,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : true,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  AUTO_REJECT_CALLS: process.env.AUTO_REJECT_CALLS !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || 'private',
  PREFIX: process.env.PREFIX || '.',
  PORT: process.env.PORT || "5000", /* Where App Will Listen On */
  OWNER_NAME: process.env.OWNER_NAME || "𝐵𝑂𝑇 𝐺𝑈𝑅𝑈",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "254110853827",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
    
