const { defineConfig } = require('cypress');
const aws = require('aws-sdk');
const AthenaExpress = require('athena-express');

/* 
ALTERNATIVE AUTH IF NOT USING TEMP CREDENTIALS FROM ~s3 DIRECTORY ON LOCAL MACHINE:

const awsCredentials = {
     region: YOUR DESIRED REGION,
     accessKeyId: YOUR ACCESS KEY,
     secretAccessKey: YOUR SECRET ACCESS KEY
 };

  aws.config.update(awsCredentials);
*/

aws.config.update({ region: 'eu-west-1' }); // ADD YOUR REGION

const athenaExpressConfig = {
  aws,
  s3: ' ' /* YOUR S3 BUCKET PATH */,
  db: '' /* YOUR ATHENA DB */,
};

const athenaExpress = new AthenaExpress(athenaExpressConfig);

module.exports = defineConfig({
  defaultCommandTimeout: 70000,
  responseTimeout: 90000,

  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        sendAthenaQuery(queryToSend) {
          return new Promise((resolve, reject) => {
            athenaExpress
              .query(queryToSend)
              .then((results) => {
                console.log('Query success!');
                resolve(results);
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          });
        },
      });
    },
  },
});
