module.exports = function(System){
	var Bitly = require('bitly');
	var mongoose = require('mongoose');
	var Photo = mongoose.model('Photo'); // Photo model

	var apiRouter = System.express.Router();

	// Middleware for routes
	apiRouter.use(function(req, res, next){
		console.log('New API request : ' + req.url);
		next();
	});

	// Test welcome route
	apiRouter.get('/', function(req, res){
		res.json({message: 'Welcome to Photare'});
		console.log(req.headers);
	});

	// Routes that end in /photos
	apiRouter.route('/photos')
		// Create a photo
		.post(function(req, res){
			var photo = new Photo();
			var image = req.files.image;

			photo.title = req.body.title;
			photo.url = req.body.url || 'http://rahul.local:8080/api/photos/1';
			photo.user = photo.shortUrl = photo.image = null;

			if(req.user){
				photo.user = req.user;
			}
			
			var getBitlyUrl = function(ok){
				if(image){
					photo.image = image.name;
					var bitly = new Bitly(System.config.bitly.username, System.config.bitly.APIKey);
					bitly.shorten('http://photare.com/test/' + image.name, function(err, response) {
						if (err) {
							ok(err);
						} else{
							photo.shortUrl = response.data.url;
							ok();
						}
					});
				} else{
					ok();
				}
			};

			getBitlyUrl
				.after(function(ok){
					photo.save(function(err){
						if(err){
							res.send(err);
						} else{
							res.json({message: 'Photo created!'});							
						}
					});
				})
				.catch(function(err){
					if(err){
						res.send(err);
					}
				});

			
		})
		// Get all photos 
		.get(function(req, res){
			Photo.find(function(err, photos){
				if(err){
					res.send(err);
				}
				res.json(photos);
			});
		});

	// Routes that end in /photos/:photo_id
	apiRouter.route('/photos/:photo_id')
		.get(function(req, res){
			Photo.findById(req.params.photo_id, function(err, photo){
				if(err){
					res.send(err);
				}
				res.json(photo);
			});
		})

		// Update a photo
		.put(function(req, res){
			Photo.findById(req.params.photo_id, function(err, photo){
				if(err){
					res.send(err);
				}
				if(photo){
					photo.title = req.body.title;

					photo.save(function(err){
						if(err){
							res.send(err);
						}
						res.json({message: 'Photo title changed to ' + req.body.title});
					});
				} else{
					res.json({message: 'Photo does not exist'});
				}
			});
		})

		// Delete a photo
		.delete(function(req, res){
			if(req.user){
				Photo.findOne({
					user: req.user,
					_id: req.body.params.photo_id
				}, function (err, photo){
					if(err){
						res.send(err);
					}
					if(photo){
						photo.remove(function(err, deletedPhoto){
							if(err){
								res.send(err);
							}
						});
						// ToDo: proper callback needs to be tested
						res.json({message: 'Photo deleted', params: req.params});
					} else{
						res.json({message: 'Access denied'});
					}
				});
			} else{
				res.json({message: 'Access denied'});
			}

		});

	return apiRouter;
};
