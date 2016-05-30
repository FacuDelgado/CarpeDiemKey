var keystone = require('keystone'),
	async = require('async'),
	props = keystone.list('Prop');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	console.log(req.params.prop);

	// Init locals
	locals.section = 'props';
	locals.filters = {
		prop: req.params.prop
	};
	locals.data = {
		prop: []
	};
	
	// Load the current prop
	view.on('init', function(next) {
		

		// state: 'published',
		var q = props.model.findOne({
			slug: locals.filters.prop
		});
		
		q.exec(function(err, result) {
			console.log(result);
			locals.data.prop = result;
			next(err);
		});
		
	});



	// Render the view
	view.render('propDetail');
	
}
