var parseOvpnLog = require("./index.js").parseOvpnLog;

var ovpnp = parseOvpnLog( "./test/openvpnserver.log" );
console.log("OVPN parser: "+JSON.stringify(ovpnp) );
