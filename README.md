# Single-sign-on for Discourse via Node.js
[![Build Status](https://travis-ci.org/ArmedGuy/discourse_sso_node.png?branch=master)](https://travis-ci.org/ArmedGuy/discourse_sso_node)

Also available for PHP [here](https://github.com/ArmedGuy/discourse_sso_node).

This is a small class to help with providing an SSO source for Discourse forums.
It provides 3 help functions for validating incoming requests, extracting nonce, and building the returning queryString.

For more information on the SSO settings in Discourse, visit <https://meta.discourse.org/t/official-single-sign-on-for-discourse/13045>

### How to use the package


Simply install via npm, require the package and create a new object, providing the SSO secret defined in Discourse
```javascript
var discourse_sso = require('discourse-sso');
var sso = new discourse_sso("-your-sso_secret-goes-here-");
```

To validate incoming logins, you can do:
```javascript
var payload = ... // fetch from incoming request
var sig = ... // fetch from incoming request
if(sso.validate(payload, sig)) {
}
```


To extract the nonce(the little piece of data that identifies the login, read more in the above link), use:
```javascript
var nonce = sso.getNonce(payload);
```


At last, to produce the query string that is to be sent back to discourse, do:
```javascript
var userparams = {
	// Required, will throw exception otherwise
	"nonce": nonce,
	"external_id": "some user id here",
	"email": "some user email",
	// Optional
	"username": "some username",
	"name": "some real name"
};
var q = sso.buildLoginString(userparams);
```

## License

MIT
