"use strict";
exports.__esModule = true;
//const spi = require('spi-device');
var spi_device_1 = require("spi-device");
// The MCP3008 is on bus 0 and it's device 0
var sender = spi_device_1["default"].open(0, 0, function (err) {
    // An SPI message is an array of one or more read+write transfers
    var message = [
        {
            sendBuffer: Buffer.from([0x01, 0xd0, 0x00]),
            receiveBuffer: Buffer.alloc(3),
            byteLength: 3,
            speedHz: 20000 // Use a low bus speed to get a good reading from the TMP36
        }
    ];
    if (err)
        throw err;
    sender.transfer(message, function (err, message) {
        if (err)
            throw err;
        // Convert raw value from sensor to celcius and log to console
        console.log(message);
    });
});
