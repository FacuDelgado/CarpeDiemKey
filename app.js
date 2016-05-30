// Load .env for development environments
require('dotenv')().load();

var keystone = require('keystone');
var engine = require('express3-handlebars');

/**
 * Application Initialisation
 */
keystone.set('cloudinary config', { cloud_name: 'dctr9jrf9', api_key: '652784929374999', api_secret: 'vg8niXKwp1D9lgI6Lz8sj6gRSIg' });

keystone.init({

	'name': 'Keystone Demo',
	'brand': 'Demo',

	'favicon': 'public/favicon.ico',
	'less': 'public',
	'static': 'public',

	'views': 'views',

	'custom engine': engine({
		layoutsDir: 'views/layouts',
		defaultLayout: 'default',
		helpers: {
			ifeq: function(a, b, options) {
				if(a == b){
					return options.fn(this);
				}else{
					return options.inverse(this);
				}
			},
			or: function(){
				var args = Array.prototype.slice.apply(arguments);
				var i=0, l=args.length;
				while(i<l){
					if(args[i]){
						return args[i];
					}
					i++;
				}
				return null;
			}
		}
	}),
	'view engine': 'handlebars',

	'auto update': true,
	'mongo':'mongodb://carpediem:carpediem1@ds011933.mlab.com:11933/carpediem',

	'session': true,
	'auth': false,
	'user model': 'User',
	'cookie secret': process.env.COOKIE_SECRET || 'demo',

	'ga property': process.env.GA_PROPERTY,
	'ga domain': process.env.GA_DOMAIN,

	'chartbeat property': process.env.CHARTBEAT_PROPERTY,
	'chartbeat domain': process.env.CHARTBEAT_DOMAIN

});

require('./models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
	ga_property: keystone.get('ga property'),
	ga_domain: keystone.get('ga domain'),
	chartbeat_property: keystone.get('chartbeat property'),
	chartbeat_domain: keystone.get('chartbeat domain')
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	'Lista de Propiedades': ['props'],
	'Regiones': 'regions',
	'users': 'users'
});

keystone.start();
