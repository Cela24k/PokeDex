import { Document, Model, Schema, Types, SchemaTypes, SchemaType } from "mongoose";
import mongoose from "mongoose";
import * as crypto from "crypto";

export interface UserInterface extends Document{
    username: string;
    email: string;
    salt: string;
    digest: string;
    favourites: [string]; //array di url 
    teams: [[Types.ObjectId]]; //array di oggetti SquadSchema{name: string, count: number, pokes: string(url)}

    setPassword(pwd: String): void,
    validatePassword(pwd: String): boolean,
}

export const UserSchema = new Schema<UserInterface>({
    username: {
        type: SchemaTypes.String,
        required:true,
        unique: true
    },
    email: {
        type: SchemaTypes.String,
        required:true,
        unique: true
    },
    salt : {
        type: SchemaTypes.String
    },
    digest: {
        type: SchemaTypes.String,
        required: true
    },
    favourites: {
        type: [SchemaTypes.String],
        default: []
    },
    teams: {
        types: [SchemaTypes.ObjectId],
        default: []
    }
})

UserSchema.methods.setPassword = function (pwd: string): void {
    this.salt = crypto.randomBytes(16).toString('hex');
    var hmac = crypto.createHmac('sha512', this.salt);
    hmac.update(pwd);
    this.digest = hmac.digest('hex'); 
}

UserSchema.methods.validatePassword = function (pwd: string): boolean {

    var hmac = crypto.createHmac('sha512', this.salt);
    hmac.update(pwd);
    var digest = hmac.digest('hex');
    return (this.digest === digest);
}

export function getSchema() { return UserSchema; }

var userModel; 
export function getModel(): Model<UserInterface> {
    if (!userModel) {
        userModel = mongoose.model('User', getSchema());
    }
    return userModel;
}

export function newUser(data: any): UserInterface {
    var user = new User(data);
    return user;
}

export const User: Model<UserInterface> = getModel();

