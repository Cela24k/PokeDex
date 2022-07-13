"use strict";
exports.__esModule = true;
exports.User = exports.newUser = exports.getModel = exports.getSchema = exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var crypto = require("crypto");
exports.UserSchema = new mongoose_1.Schema({
    username: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        unique: true
    },
    email: {
        type: mongoose_1.SchemaTypes.String,
        required: true,
        unique: true
    },
    salt: {
        type: mongoose_1.SchemaTypes.String
    },
    digest: {
        type: mongoose_1.SchemaTypes.String,
        required: true
    },
    favourites: {
        type: [mongoose_1.SchemaTypes.String],
        "default": []
    },
    teams: {
        types: [mongoose_1.SchemaTypes.ObjectId],
        "default": []
    }
});
exports.UserSchema.methods.setPassword = function (pwd) {
    this.salt = crypto.randomBytes(16).toString('hex');
    var hmac = crypto.createHmac('sha512', this.salt);
    hmac.update(pwd);
    this.digest = hmac.digest('hex');
};
exports.UserSchema.methods.validatePassword = function (pwd) {
    var hmac = crypto.createHmac('sha512', this.salt);
    hmac.update(pwd);
    var digest = hmac.digest('hex');
    return (this.digest === digest);
};
function getSchema() { return exports.UserSchema; }
exports.getSchema = getSchema;
var userModel;
function getModel() {
    if (!userModel) {
        userModel = mongoose_2["default"].model('User', getSchema());
    }
    return userModel;
}
exports.getModel = getModel;
function newUser(data) {
    var user = new exports.User(data);
    return user;
}
exports.newUser = newUser;
exports.User = getModel();
