import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, "Username is required"],
    },
    username: {
        type: String,
        unique: [true, 'Username already exists']
    },
    image: {
        type: String,
    },
})

UserSchema.set('timestamps', true);

const User = models.User || model("User", UserSchema);

export default User;