var discourse_sso = require("./index.js");
var sso = new discourse_sso("much secret, very wow");

var payload = "bm9uY2U9dmVyeV93b3dfbXVjaF9iYXNlNjRfc29fcXVlcnk=";
var sig = "6648376284f212b08cc66f18fc8a8f188bcf16072944add79be71939a3c8b218";

if(!sso.validate(payload, sig)) {
	throw new Exception("Nope nope and nope, failed validating data!");
} else {
	console.log("Successfully validated incoming data!");
}

var nonce = sso.getNonce(payload);
if(nonce !== "very_wow_much_base64_so_query") {
	throw new Exception("Nein, extracted nonce is incorrect!");
} else {
	console.log("Successfully extracted nonce from payload!");
}

var userparams = {
	"external_id": 1337,
	"nonce": nonce,
	"email": "gifcat@example.com",
	"username": "gifcat",
	"name": "Catmeister"
}

if(sso.buildLoginString(userparams) !== "sso=ZXh0ZXJuYWxfaWQ9MTMzNyZub25jZT12ZXJ5X3dvd19tdWNoX2Jhc2U2NF9zb19xdWVyeSZlbWFpbD1naWZjYXQlNDBleGFtcGxlLmNvbSZ1c2VybmFtZT1naWZjYXQmbmFtZT1DYXRtZWlzdGVy&sig=065c73bbd0fee67517e7c852923f04c6380200cc0770e5a2b293cdafe29c3ee0") {
	throw new Exception("Failed to match proper query string!");
} else {
	console.log("Successfully built proper query string!");
}

