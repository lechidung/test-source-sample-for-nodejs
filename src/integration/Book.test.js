'use strict';

const request = require('request');
const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');

const server = require('../../../src/app');
const {api} = require('../../../src/configs');
const dataProvider = require('./dataProvider/books');
const testCase = require('./testCase/books');
const RealDate = Date;

function mockDate (isoDate) {
    global.Date = class extends RealDate {
        constructor () {
            return new RealDate(isoDate)
        }
    }
}

describe('books Detail API Success', () => {
    before(() => {
        chai.use(chaiHttp);
    });

    beforeEach(() => {
        global.Date = RealDate;
        mockDate('2018-07-12T12:00:00z');

        // Mock CMS API get books Detail
        nock(api['BOOK_DETAIL'].host)
        .get(api['BOOK_DETAIL'].path)
        .query({
            url_key: 'book_code'
        })
        .reply(200, dataProvider.book_info);

        // Mock get IAM Data API
        nock(api['IAM'].host, {
            reqheaders: {
                'App-Auth': 'PemToken'
            }
        })
        .get(api['IAM'].path)
        .query({
            fields: 'login, reg, prem, iden'
        })
        .reply(200, dataProvider.IAMResult);

        // Mock Target User API
        let iamDataStr = JSON.stringify(dataProvider.IAMData);
        let iamDataBase64 = Buffer.from(iamDataStr).toString("base64");

        nock(api['TARGET_USER'].host)
        .get(api['TARGET_USER'].path)
        .query({
            cp_id: dataProvider.book_info.book_id,
            date: 20180712190000,
            iam_data: iamDataBase64
        })
        .reply(200, dataProvider.targetUser);
    });

    afterEach(() => {
        global.Date = RealDate;
    });

    testCase.forEach(v => {
        it(v.caseName, done => {
            // When
            chai.request(server)
            .get(v.path)
            .set(v.headers)
            .query(v.queryParameters)
            .end((err, res) => {
                // Then
                expect(res).to.have.status(v.expected.status);
                expect(res.body).to.deep.equal(v.expected.body);
                done();
            });
        });
    });
});
