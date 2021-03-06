const axios = require('axios');
const querystring = require('querystring');
const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

class Services {

    async getGraphUser(context) {

        const host = 'https://login.microsoftonline.com/' + context.activity.channelData.tenant.id + '/oauth2/v2.0/token';

        const data = {
            grant_type: 'client_credentials',
            client_id: context.adapter.credentials.appId,
            client_secret: context.adapter.credentials.appPassword,
            scope: 'https://graph.microsoft.com/.default',
        };

        //get access token
        const token = await axios.post(host, querystring.stringify(data))
            .then(response => {
                return response.data.access_token;
            })
            .catch((error) => {
                console.log('error ' + error);
            });

        //get user data from Microsoft Graph
        const AuthStr = 'Bearer '.concat(token);
        const url = 'https://graph.microsoft.com/v1.0/users/' + context.activity.from.aadObjectId;

        return await axios.get(url, { headers: { Authorization: AuthStr, host: 'graph.microsoft.com', contentType: 'application/json' } })
            .then(response => {
                return response.data;
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }

    async getAuthenImage(context, url) {

        const host = context.adapter.credentials.oAuthEndpoint;

        const data = {
            grant_type: 'client_credentials',
            client_id: context.adapter.credentials.appId,
            client_secret: context.adapter.credentials.appPassword,
            scope: context.adapter.credentials.oAuthScope,
        };

        //get access token
        const token = await axios.post(host, querystring.stringify(data))
            .then(response => {
                return response.data.access_token;
            })
            .catch((error) => {
                console.log('error get access token: ' + error);
            });

        //get binary image
        const AuthStr = 'Bearer '.concat(token);
        return await axios.get(url, { headers: { Authorization: AuthStr, contentType: 'application/octet-stream' }, responseType: 'arraybuffer' })
            .then(response => {
                return response.data;
            })
            .catch((error) => {
                console.log('error get binary image: ' + error);
            });
    }

    async getCustomerById(id) {

        const mySqlDatabase = process.env.MYSQL_DATABASE || process.env.APPSETTING_MYSQL_DATABASE;
        const mySqlUser = process.env.MYSQL_USER || process.env.APPSETTING_MYSQL_USER;
        const mySqlPassword = process.env.MYSQL_PASSWORD || process.env.APPSETTING_MYSQL_PASSWORD;
        const mySqlHost = process.env.MYSQL_HOST || process.env.APPSETTING_MYSQL_HOST;

        const sequelize = new Sequelize(mySqlDatabase, mySqlUser, mySqlPassword, {
            dialect: 'mysql',
            host: mySqlHost,
            dialectOptions: {
                ssl: {
                    ca: fs.readFileSync(path.join(__dirname, '/BaltimoreCyberTrustRoot.crt.pem'))
                }
            }
        });

        const customer = await sequelize.query(`SELECT * FROM customer_info where KUNNR = ${id}`,
            {
                raw: true
            }).then(myTableRows => {
                return myTableRows[0];
            }).catch(function (err) {
                return [];
            });
        return customer;
    }
}

exports.Services = Services;