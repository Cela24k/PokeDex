"use strict";
exports.__esModule = true;
exports.User = exports.newUser = exports.getModel = exports.getSchema = exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
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
        type: [mongoose_1.SchemaTypes.ObjectId],
        "default": []
    },
    teams: {
        types: [mongoose_1.SchemaTypes.ObjectId],
        "default": []
    }
});
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
