var _ = require('underscore'),
	keystone = require('keystone'),
	importRoutes = keystone.importer(__dirname);

function restrictToAdmins(req, res, next) {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.redirect('/signin');
	}
}

keystone.pre('routes', function(req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Props', key: 'props', href: '/Propiedades' },
		{ label: 'AboutUs', key: 'aboutUs', href: '/Sobre-nosotros' },
		{ label: 'Contact', key: 'contact', href: '/contacto' }
	];

	res.locals.user = req.user;

	next();

});

keystone.pre('render', function(req, res, next) {

	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};

	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length }) ? flashMessages : false;

	next();

});

keystone.set('404', function(req, res, next) {
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	//api: importRoutes('./api'),
	download: importRoutes('./download'),
	views: importRoutes('./views')
};

exports = module.exports = function(app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/Propiedades/:category?', routes.views.props);
	app.get('/Sobre-nosotros', routes.views.aboutUs);
	app.all('/contacto', routes.views.contact);

}
