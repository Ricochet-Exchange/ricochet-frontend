module.exports = function (app) {
	app.use('/manifest.json', function (req, res, next) {
		res.set({
			'Access-Control-Allow-Origin': 'https://gnosis-safe.io',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
		});
		next();
	});
	app.use('/', function (req, res, next) {
		res.set({
			'Content-Security-Policy':
				"frame-ancestors 'self' https://dapp-browser.apps.ledger.com https://gnosis-safe.io/",
		});
		next();
	});
};
