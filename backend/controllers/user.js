'use strict'
var models = require("../../models");
var moment = require('moment');
var cloudinary = require('cloudinary');
var crypto = require('crypto');
var service = require('../services/service');
var passport = require('passport');

cloudinary.config({
	cloud_name: process.env.CDN_NAME,
	api_key: process.env.CDN_API_KEY,
	api_secret: process.env.CDN_API_SECRET
})

exports.getInfo = function (req, res, next) {
    models.User.findOne({
        where:{
            id: req.params.id
        }
    }).then(function (result){
		if(!result){
			service.sendJSONresponse(res,500,{"type":false,"message":"error al encontrar el registro", "data":result});
		}else{
			service.sendJSONresponse(res,200,{"type":true, "data":result});
		}
	})
}

exports.create = function (req, res, next) {
    models.User.create({
        username: req.body.username,
        userLogin: req.body.userLogin,
        salt: crypto.randomBytes(16).toString('hex')
    }).then(function(user) {
        if(!user){
			service.sendJSONresponse(res,500,{"type":false,"message":"Error al crear el registro","data":user});
		}else{
			var _token = service.createToken(user);
            console.log(_token);
			user.update({
				hash: crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64).toString('hex')
			}).then(function(){
				service.sendJSONresponse(res, 200, {"type": true, "data": "Registro creado exitosamente", "token": _token})
			})
		};
    })
}

exports.uploadAvatar = function(req, res, next){
	cloudinary.uploader.upload(req.files.file.path, function(result, callback){
		service.sendJSONresponse(res,200,{"type":true,"data":result});
	});
}

exports.putAvatar = function(req, res, next){
	models.User.update(
		{
			avatar: req.body.avatar
		},
		{
			where:{
				id: req.params.id
			}
		}
	).then(function (result){
		if(!result){
			service.sendJSONresponse(res,500,{"type":false,"message":"error al encontrar el registro", "data":result});
		}else{
			service.sendJSONresponse(res,200,{"type":true,"message":"Imagen de Perfil Actualizada exitosamente...", "data":result});
		}
	})

}

exports.login = function(req, res, next) {
    if(!req.body.userLogin ||  !req.body.password){
		service.sendJSONresponse(res, 400, {"type": false, "data": "Todos los campos son requeridos"});
		return;
	}

    passport.authenticate('local', function(err, user, info){
		var _token;
		if(err){
			service.sendJSONresponse(res,404,{"type":false, "data":err,"dataType": "Error"});
			return;
		}

		if(user){
			_token = service.createToken(user);
			service.sendJSONresponse(res,200, {"type":true, "token": _token, "info": user.id});
		}else{
			service.sendJSONresponse(res,401,{"type":false, "data": info, "dataType": "Info"});
		}
	})(req, res);
}