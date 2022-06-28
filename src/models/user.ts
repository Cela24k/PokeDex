import { Document, Model, Schema, Types, SchemaTypes, SchemaType } from "mongoose";
import mongoose from "mongoose";

export interface UserInterface extends Document{
    username: string;
    email: string;
    salt: string;
    digest: string;
    favourites: [Types.ObjectId];
    teams: [Types.ObjectId];
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
        type: [SchemaTypes.ObjectId],
        default: []
    },
    teams: {
        types: [SchemaTypes.ObjectId],
        default: []
    }
})

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

