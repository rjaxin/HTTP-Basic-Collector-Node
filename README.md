# HTTP-Basic-Collector-Node

This is an example Custom Node that can be imported into [Ping Advanced Identity Cloud](https://docs.pingidentity.com/pingoneaic/latest/journeys/node-designer.html#import-custom-node) or PingAM to be used in a journey.

The functionality is similar to the out-of-the-box [Zero Login Page Collector Node](https://docs.pingidentity.com/auth-node-ref/latest/zero-page-login-collector.html), however, it will decode a standard Basic Authorization header as per [rfc7617](https://datatracker.ietf.org/doc/html/rfc7617), and push the username and password into the Journey's shared/transient states.

The Custom Node import file can be downloaded [here](HTTP-Basic-Collector-Node.json)

The script source is [here](src/main.js):
