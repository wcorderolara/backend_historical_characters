var jwt = require('jwt-simple');
var moment = require('moment');
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../../config/config.json')[env];
var crypto = require('crypto');
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CDN_NAME,
	api_key: process.env.CDN_API_KEY,
	api_secret: process.env.CDN_API_SECRET
});

exports.uploadImage = function(file) {
    cloudinary.uploader.upload(file, function(result, callback) {
        return result;
    });
};

exports.createToken = function(user) {
    var payload = {
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(1,"days").unix(),
    }

    return jwt.encode(payload, process.env.JWT_SECRET);
};

exports.sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.header("Access-Control-Allow-Origin", '*');
    res.json(content);
}

exports.errorMessage = function(action, model) {
    return "Ha ocurrido un error al momento de " + action +  model + ".";
}

exports.encrypt = function(text) {
    var key = crypto.enc.Base64.parse(process.env.ENC_KEY);
    var iv = crypto.enc.Base64.parse(process.env.ENC_IV);
    var _crypted = crypto.AES.encrypt(text, key, {iv: iv });

    return _crypted.toString(); 
};

exports.decrypt = function(encrypted) {
    var key = crypto.enc.Base64.parse(process.env.ENC_KEY);
    var iv = crypto.enc.Base64.parse(process.env.ENC_IV);
    var _decrypted = crypto.AES.decrypt(text, key, {iv: iv });

    return _decrypted.toString(crypto.enc.Utf8);
};