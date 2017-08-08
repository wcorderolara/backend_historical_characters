var models = require('../../models');
var service = require('../services/service');
var codes = require('../services/serverCodes.json');

var cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: process.env.CDN_NAME,
	api_key: process.env.CDN_API_KEY,
	api_secret: process.env.CDN_API_SECRET
})

exports.post = function(req, res, next) {
    models.historicalCharacter.create({
        name: req.body.name,
        bio: req.body.bio || null,
        avatar: req.body.avatar || null  
    }).then(function(response) {
        if(!response) {
            service.sendJSONresponse(res, codes.serverError, {"type": false, "message": service.errorMessage('Crear', 'el Personaje Histórico')})
        }else {
            service.sendJSONresponse(res, codes.created, {"type": true});
        }
    })
};

exports.put = function(req, res, next) {
    models.historicalCharacter.update({
        name: req.body.name,
        bio: req.body.bio || null,
        avatar: req.body.avatar
    }, {
        where: {
            id: req.params.id
        }
    }).then(function(response) {
        if(!response) {
            service.sendJSONresponse(res, codes.serverError, {"type": false, "message": service.errorMessage('Actualizar', 'el Personaje Histórico')});
        }else {
            service.sendJSONresponse(res, codes.ok, {"type": true});
        }
    })
};

exports.delete = function(req, res, next) {
    models.historicalCharacter.update({
        status: 0
    }, {
        where: {
            id: req.params.id
        }
    }).then(function(response) {
        if(!response) {
            service.sendJSONresponse(res, codes.serverError, {"type": false, "message": service.errorMessage('Eliminar', 'el Personaje Histórico')});
        }else {
            service.sendJSONresponse(res, codes.ok, {"type": true});
        }
    })
};

exports.getAll = function(req, res, next) {
    models.historicalCharacter.findAll({
        where: {
            status: 1
        }
    }).then(function(response) {
        if(!response) {
            service.sendJSONresponse(res, codes.serverError, {"type": false, "message": service.errorMessage('Obtener', 'los Personajes Históricos')});
        }else {
            service.sendJSONresponse(res, codes.ok, {"type": true, "data": response});
        }
    })
}

exports.getById = function(req,res, next) {
    models.historicalCharacter.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(response) {
        if(!response) {
            service.sendJSONresponse(res, codes.serverError, {"type": false, "message": service.errorMessage('Obtener', 'el Personaje Histórico')});
        }else {
            service.sendJSONresponse(res, codes.ok, {"type": true, "data": response});
        }
    })
}

exports.uploadAvatar = function(req, res, next){
	cloudinary.uploader.upload(req.files.file[0].path, function(result, callback){
		service.sendJSONresponse(res,200,{"type":true,"data":result});
	});
}

exports.putAvatar = function(req, res, next){
	models.historicalCharacter.update(
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
			service.sendJSONresponse(res,200,{"type":true,"message":"Avatar Actualizado exitosamente...", "data":result});
		}
	})

}