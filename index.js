var crypto 		= require("crypto"),
	querystring = require("querystring");

(function() {
	"use strict";
	var discourse_sso = function(secret) {
		this.sso_secret = secret;
	}
	
	discourse_sso.prototype.getHmac = function() {
		return crypto.createHmac("sha256", this.sso_secret);
	}
	
	discourse_sso.prototype.validate = function(payload, sig) {
		var hmac = this.getHmac();
		hmac.update(querystring.unescape(payload));
		if(hmac.digest("hex") === sig) {
			return true;
		} else {
			return false;
		}
	}
	
	discourse_sso.prototype.getNonce = function(payload) {
		var q = querystring.parse(
			new Buffer( querystring.unescape(payload) , 'base64').toString()
		);
		if("nonce" in q) {
			return q["nonce"];
		} else {
			throw new Exception("Missing Nonce in payload!");
		}
	}
	
	discourse_sso.prototype.buildLoginString = function(params) {
		if(!("external_id" in params)) {
			throw new Exception("Missing required parameter 'external_id'");
		}
		if(!("nonce" in params)) {
			throw new Exception("Missing required parameter 'nonce'");
		}
		if(!("email" in params)) {
			throw new Exception("Missing required parameter 'email'");
		}
		
		var payload = new Buffer( querystring.stringify(params) , 'utf8').toString("base64");
		var hmac = this.getHmac();
		hmac.update(payload);
		
		return querystring.stringify({
			'sso': payload,
			'sig': hmac.digest('hex')
		});
	}
	
	module.exports = discourse_sso;
})();