import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        trim:true,
    },
    password: {
        type:String,
        required: [true, 'Password is required']

    },
    username: {
        type: String,
        required: [true,'Username is required']
    }

},{ timestamps : true });



// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



// Match entered password  with hashed one

userSchema.methods.matchPasswords = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
