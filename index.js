"use strict";
var crypto 		= require("crypto"),
	querystring = require("querystring");

var ssoSecret;

var discourseSSO = {
	getHmac: function() {
		return crypto.createHmac("sha256", ssoSecret);
	},
	validate: function(payload, sig) {
		var hmac = this.getHmac();
		hmac.update(querystring.unescape(payload));
		return hmac.digest("hex") === sig;
	},
	getNonce: function(payload) {
		var q = querystring.parse(new Buffer( querystring.unescape(payload) , 'base64').toString());
		if (q.nonce) {
			return q.nonce;
		} else {
			throw new Exception("Missing Nonce in payload!");
		}
	},
	buildLoginString: function(params) {
		["external_id", "email", "nonce"].forEach(function(param){
			if(!params.hasOwnProperty(param)){
				throw new Exception('Missing required parameter: ' + param)
			}
		});
		var payload = new Buffer( querystring.stringify(params) , 'utf8').toString("base64");
		return querystring.stringify({
			sso: payload,
			sig: this.getHmac().update(payload).digest('hex')
		});
	}
};

module.exports = function(secret) {
	ssoSecret = secret;
	return discourseSSO;
};