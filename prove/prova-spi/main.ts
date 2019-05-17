//const spi = require('spi-device');
import spi from "spi-device";

// The MCP3008 is on bus 0 and it's device 0
const sender = spi.open(0, 0, (err: any) => {
  // An SPI message is an array of one or more read+write transfers
  const message = [
    {
      sendBuffer: Buffer.from([0x01, 0xd0, 0x00]), // Sent to read channel 5
      receiveBuffer: Buffer.alloc(3), // Raw data read from channel 5
      byteLength: 3,
      speedHz: 20000 // Use a low bus speed to get a good reading from the TMP36
    }
  ];

  if (err) throw err;

  sender.transfer(message, (err, message) => {
    if (err) throw err;

    // Convert raw value from sensor to celcius and log to console
    console.log(message);
  });
});
