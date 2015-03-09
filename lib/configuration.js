var _		= require('lodash'),
	oauth2	= require('oauth2-base'),
	uuid	= require('node-uuid');

/**
 * Create a Configuration for OAuth2Provider
 * @constructor
 * @param  {Client}      client The memjs client
 * @param  {Object|null} configuration
 */
module.exports = function OAuth2Configuration(client, configuration) {
	var self = this;

	var lifetime = configuration.lifetime || 3600;

	// Apply the given configuration
	self = _.merge(self, {
		'AuthorizationCode': {
			/**
			 * Load an AuthorizationCode
			 * @param  {String}          identifier [The Identifier for the OAuth2AuthorizationCode]
			 * @param  {OAuth2Context}   context    [The OAuth2Context for this action]
			 * @param  {Function}        callback   [The Function to Call with the Result. FALSE if error]
			 * @return {void}                       [No Return Value, call the Callback with the Result]
			 */
			'load': function load(identifier, context, callback) {
				client.get('authorization_code_' + identifier, function(error, value) {
					if(error) {
						callback(false);
					}
					callback(new oauth2.OAuth2AuthorizationCode({
						'resourceOwner': new oauth2.OAuth2ResourceOwner(value.resourceOwner),
						'client': new oauth2.OAuth2Client(value.client),
						'scopes': value.scopes
					}));
				});
			},

			/**
			 * Save an OAuth2AuthorizationCode
			 *
			 * Implement the lifetime here yourself.
			 *
			 * @param  {OAuth2ResourceOwner}   resourceOwner [The OAuth2ResourceOwner passed on by Configuration.ResourceOwner.load]
			 * @param  {OAuth2Client}          client        [The OAuth2Client passed on by Configuration.Client.load]
			 * @param  {String[]}              scopes        [Array of granted Scopes.]
			 * @param  {OAuth2Context}         context       [The OAuth2 Context for this action]
			 * @param  {Function}              callback      [Call when finished. Return the lifetime in seconds. The identifier of the Session as the second parameter.]
			 * @return {void}                                [No Return Value, call the Callback when finished]
			 */
			'save': function save(resourceOwner, client, scopes, context, callback) {
				var value = {
					'resourceOwner': resourceOwner,
					'client': client,
					'scopes': scopes
				};

				var identifier = uuid.v4();

				client.set('authorization_code_' + identifier, value, function() {
					callback(lifetime, identifier);
				}, lifetime);
			},

			/**
			 * Delete an OAuth2AuthorizationCode
			 * @param  {String}       identifier    [The Identifier for the OAuth2AuthorizationCode]
			 * @param  {Function}     callback      [Call when finished. No value needed for Callback]
			 * @return {void}                       [No Return Value, call the Callback when finished]
			 */
			'remove': function remove(identifier, callback) {
				client.delete('authorization_code_' + identifier, function() {
					callback();
				});
			}
		},
		'AccessToken': {
			/**
			 * Load a OAuth2AccessToken
			 * @param  {String}          identifier [The Identifier for the OAuth2AccessToken]
			 * @param  {OAuth2Context}   context    [The OAuth2Context for this action]
			 * @param  {Function}        callback   [The Function to Call with the Result. FALSE if error]
			 * @return {void}                       [No Return Value, call the Callback with the Result]
			 */
			'load': function load(identifier, context, callback) {
				client.get('access_token_' + identifier, function(error, value) {
					if(error) {
						callback(false);
					}
					callback(new oauth2.OAuth2AccessToken({
						'resourceOwner': new oauth2.OAuth2ResourceOwner(value.resourceOwner),
						'client': new oauth2.OAuth2Client(value.client),
						'scopes': value.scopes
					}));
				});
			},

			/**
			 * Save an OAuth2AccessToken
			 *
			 * Implement the lifetime here yourself.
			 *
			 * @param  {OAuth2ResourceOwner}   resourceOwner [The OAuth2ResourceOwner passed on by Configuration.ResourceOwner.load]
			 * @param  {OAuth2Client}          client        [The OAuth2Client passed on by Configuration.Client.load]
			 * @param  {String[]}              scopes        [Array of granted Scopes.]
			 * @param  {OAuth2Context}         context       [The OAuth2 Context for this action]
			 * @param  {Function}              callback      [Call when finished. Return the lifetime in seconds. The identifier of the Session as the second parameter.]
			 * @return {void}                                [No Return Value, call the Callback when finished]
			 */
			'save': function save(resourceOwner, client, scopes, context, callback) {
				var value = {
					'resourceOwner': resourceOwner,
					'client': client,
					'scopes': scopes
				};

				var identifier = uuid.v4();

				client.set('access_token_' + identifier, value, function() {
					callback(lifetime, identifier);
				}, lifetime);
			}
		},
		'RefreshToken': {
			/**
			 * Load a OAuth2RefreshToken
			 * @param  {String}          identifier [The Identifier for the OAuth2RefreshToken]
			 * @param  {OAuth2Context}   context    [The OAuth2Context for this action]
			 * @param  {Function}        callback   [The Function to Call with the Result. FALSE if error]
			 * @return {void}                       [No Return Value, call the Callback with the Result]
			 */
			'load': function load(identifier, context, callback) {
				client.get('refresh_token' + identifier, function(error, value) {
					if(error) {
						callback(false);
					}
					callback(new oauth2.OAuth2RefreshToken({
						'resourceOwner': new oauth2.OAuth2ResourceOwner(value.resourceOwner),
						'client': new oauth2.OAuth2Client(value.client),
						'scopes': value.scopes
					}));
				});
			},

			/**
			 * Save an OAuth2RefreshToken
			 *
			 * Implement the lifetime here yourself.
			 *
			 * @param  {OAuth2ResourceOwner}   resourceOwner [The OAuth2ResourceOwner passed on by Configuration.ResourceOwner.load]
			 * @param  {OAuth2Client}          client        [The OAuth2Client passed on by Configuration.Client.load]
			 * @param  {String[]}              scopes        [Array of granted Scopes.]
			 * @param  {OAuth2Context}         context       [The OAuth2 Context for this action]
			 * @param  {Function}              callback      [Call when finished. Return the lifetime in seconds. The identifier of the Session as the second parameter.]
			 * @return {void}                                [No Return Value, call the Callback when finished]
			 */
			'save': function save(resourceOwner, client, scopes, context, callback) {
				var value = {
					'resourceOwner': resourceOwner,
					'client': client,
					'scopes': scopes
				};

				var identifier = uuid.v4();

				client.set('refresh_token' + identifier, value, function() {
					callback(lifetime, identifier);
				}, lifetime);
			}
		}
	}, configuration);
};