const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
	async index(request, response) {
		// Getting values passed by request.query
		const { latitude, longitude, techs} = request.query;
		console.log(request.query);
		// Gettting every value from techs
		const techsArray = parseStringAsArray(techs);
		console.log(techsArray);

		const devs = await Dev.find({
			// return the techs in ....
			techs: {
				$in: techsArray,
			}, 
			location: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [longitude, latitude],
					},
					$maxDistance: 10000,
				},
			},			
		});
		return response.json({ devs });
	}
}