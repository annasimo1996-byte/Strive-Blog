const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        googleID: {
            type: String,
            unique: true,
            sparse: true,
        },
        birthData: {
            type: String,
            required: function(){
                return !this.googleID
            },
        },
        avatar: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: function(){
                return !this.googleID
            },
            select: false,
        }
    },
    {
        timestamps: true,
        strict: true,
    }
)

usersSchema.pre("save", async function () {
    console.log("=== [DEBUG] Il middleware pre-save è partito ===");
    const instance = this;

    if (!instance.isModified("password") || !instance.password) {
        console.log("=== [DEBUG] Password non modificata o assente, vado avanti ===");
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        instance.password = await bcrypt.hash(instance.password, salt);
    } catch (error) {
       throw error;
    }
});

usersSchema.methods.comparePassword = function (plainPassword) {
    if (!this.password) return false; 
    return bcrypt.compare(plainPassword, this.password)
}

module.exports = mongoose.model("user", usersSchema)