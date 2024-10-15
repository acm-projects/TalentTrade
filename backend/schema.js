const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    User: {
        Personal_info: {
            Username: {
                type: String,
                required: true
            },
            Email: {
                type: String,
                required: true
            },
            Password: {
                type: String,
                required: true
            },
            Fname: {
                type: String,
                required: true
            },
            Lname: {
                type: String,
                required: true
            },
            DOB: {
                type: String,
                required: true
            },
            year: {
                type: String,  // freshman, sophomore, alumni, etc.
                required: false
            },
            location: {
                type: String,
                required: false
            },
            aboutMe: {
                type: String,
                required: false
            },
            profilePicture: {
                type: String,
                required: false
            },
            profileBanner: {
                type: String,
                required: false
            }
        },
        Skills: {
            teaching_skills: [
                {
                    Name: {
                        type: String,
                        required: false
                    },
                    Description: {
                        type: String,
                        required: false
                    },
                    Rating_score: {
                        type: Number,
                        required: false
                    },
                    Hours_taught: {
                        type: Number,
                        required: false
                    }
                }
            ],
            learning_skills: [
                {
                    Name: {
                        type: String,
                        required: false
                    },
                    Description: {
                        type: String,
                        required: false
                    }
                }
            ]
        }
    }
}, {timestamps: true});

module.exports = mongoose.model("UserProfile", profileSchema);