var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = 'props';
	locals.filters = {
		category: req.params.category
	};
	locals.data = {
		props: []
	};
	
	// Load the props
	view.on('init', function(next) {
		
		var q = keystone.list('Prop').paginate({
				page: req.query.page || 1,
 				perPage: 10,
 				maxPages: 10
			});
		
		// if (locals.data.category) {
		// 	q.where('categories').in([locals.data.category]);
		// }
		
		q.exec(function(err, results) {
			locals.data.props = results;
			console.log(results);
			next(err);
		});
		
	});
	

	// Render the view
	view.render('props');
	
}
