'use strict';

const dataProvider = require('../dataProvider/books');

var testCase = [
    {
        caseName: 'Case valid data user not logged',
        queryParameters: {
            url_key: 'book_code',
            device: 'pc'
        },
        headers: {},
        path: '/v1/book/get-book-detail',
        expected: {
            status: 200,
            body: {
                book_info: dataProvider.book_info,
                user: {}
            }
        }
    },
    {
        caseName: 'Case valid data user logged',
        queryParameters: {
            url_key: 'book_code',
            device: 'pc',
        },
        headers: {
            'Auth':'autToken',
        },
        path: '/v1/book/get-book-detail',
        expected: {
            status: 200,
            body: {
                book_info: dataProvider.book_info,
                user: dataProvider.user
            }
        }
    },
    {
        caseName: 'Case invalid query parameter device',
        queryParameters: {
            url_key: 'book_code'
        },
        headers: {},
        path: '/v1/book/get-book-detail',
        expected: {
            status: 400,
            body: {
                "error": {
                    "message": "NOT_ENOUGH_PARAM",
                    "code": "1001"
                }
            }
        }
    }
]

module.exports = testCase;
