const applePayPaymentToken = require('./index.js');
const fs = require('fs');
const path = require('path');

const requestToken = {
    "data": "<encryptedData>",
    "version": "EC_v1",
    "signature": "<signature>",
    "header": {
        "ephemeralPublicKey": "<ephemeralPublicKey>",
        "publicKeyHash": "<publicKeyHash>",
        "transactionId": "<transactionId>"
    }
}

const publicCert = fs.readFileSync(path.join(__dirname, './publicCert.pem'), 'utf8') // import your certificate file
const privateKey = fs.readFileSync(path.join(__dirname, './privateKey.pem'), 'utf8') // import your private key file

const token = new applePayPaymentToken(requestToken)
const decryptedToken = token.decrypt(publicCert, privateKey)
decryptedToken.then( ret => {
    console.log(ret)
}).catch( err => {
    console.error(err)
})
