var express = require('express');
var router = express.Router();
var fs = require('fs');
var jwt = require('express-jwt');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
var controllers = {},
	controllers_path = process.cwd() + '/backend/controllers';

fs.readdirSync(controllers_path).forEach(function (file){
	if(file.indexOf('.js') != -1){
		controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
	}
})

var routesController = function (server){
	//Personajes Historicos
	server.get("/characters", controllers.historicalCharacter.getAll);
	server.get("/character/:id", controllers.historicalCharacter.getById);
	server.post("/character",  controllers.historicalCharacter.post);
	server.post("/character/upload/avatar", multipartMiddleware, controllers.historicalCharacter.uploadAvatar);
	server.put("/character/update/avatar/:id", controllers.historicalCharacter.putAvatar);
	server.put("/update/character/:id",  controllers.historicalCharacter.put);
	server.put("/del/character/:id",  controllers.historicalCharacter.delete);

	//Usuarios
	server.get("/user/get/:id", controllers.user.getInfo);
	server.post("/user/create", controllers.user.create);
	server.post("/auth/login", controllers.user.login);
	server.post("/user/upload/avatar", multipartMiddleware, controllers.user.uploadAvatar);
	server.put("/user/update/avatar/:id",controllers.user.putAvatar);

};

module.exports = routesController;
