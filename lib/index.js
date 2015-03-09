var MemJsOAuth2Configuration = require('./configuration'),
	oauth2 = require('oauth2-base');

module.exports = _.extend(oauth2, {
	'MemJsConfiguration': MemJsOAuth2Configuration
}};