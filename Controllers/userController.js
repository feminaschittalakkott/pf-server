const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')

exports.userRegistration = async (req, res) => {
    console.log(req.body)
    const { email, username, password } = req.body
    if (!email || !username || !password) {
        res.status(400).json("Invalid data!!")
    }
    else {
        try {
            // Check if the user already exists
            const existingUser = await users.findOne({ email });
            if (existingUser) {
                return res.status(400).json("Email already exists");
            }
            const newUser = new users({
                email, username, password, linkedin: "", github: "", profile: ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        } catch (error) {
            console.error(error);
            res.status(500).json("Server Error");
        }

    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await users.findOne({ email, password });
        if (existingUser) {
            const token = jwt.sign({ userid: existingUser._id }, process.env.SECRET_KEY)
            return res.status(200).json({ token, username: existingUser.username, github: existingUser.github, linkedin: existingUser.linkedin, profile: existingUser.profile });
        }
        else {
            res.status(404).json("Invalid Email or Password");
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
}

exports.profileUpdate = async (req, res) => {
    try {
        const userid = req.payload
        if (req.file) {
            var profile = req.file.filename
            var { username, github, linkedin } = req.body
        }
        else {
            var { username, github, linkedin, profile } = req.body
        }
        const existingProfile = await users.findOne({ _id: userid })
        existingProfile.username = username
        existingProfile.github = github
        existingProfile.linkedin = linkedin
        existingProfile.profile = profile
        await existingProfile.save()
        res.status(200).json("Profile Updated!")
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
}