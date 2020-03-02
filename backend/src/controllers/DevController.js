const axios = require('axios');
const Dev  = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
		// List all developers
    async index(request, response){
			let devs = await Dev.find();
			return response.json(devs);
		},
		async store(request, response) { // Create a new record in the database (MongoDB)
			const {github_username, techs, latitude, longitude} =  request.body;
			// Checking in the database if exist the user with github username
			let dev = await Dev.findOne({github_username });
			if (!dev) {
				const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
				let { name = login, avatar_url, bio} = apiResponse.data;		
				const techsArray = parseStringAsArray(techs);		
				const location = {type: 'Point', coordinates: [longitude, latitude]};		
				dev = await Dev.create({ github_username, name, avatar_url, bio, techs: techsArray, location });   
			}
		return response.json(dev);
	}
}