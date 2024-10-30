const projects = require('../Models/projectModel')

exports.addProject = async (req, res) => {
    try {
        const { title, desc, languages, github, demo } = req.body
        const image = req.file.filename
        const userid = req.payload
        if (!title || !desc || !languages || !github || !demo || !image) {
            res.status(406).json("Enter valid data!")
        }
        else {
            const newProjects = new projects({
                title, description: desc, languages, github, demo, image, userid
            })
            await newProjects.save()
            res.status(200).json(newProjects)
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.getProjects = async (req, res) => {
    try {
        const userid = req.payload
        const projectList = await projects.find({ userid })
        res.status(200).json(projectList)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params
        const result = await projects.findOneAndDelete({ _id: id })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params
        if (req.file) {
            var image = req.file.filename
            var { title, desc, languages, github, demo } = req.body
        }
        else {
            var { title, desc, languages, github, demo, image } = req.body
        }
        const userid = req.payload
        if (!title || !desc || !languages || !github || !demo || !image) {
            res.status(406).json("Enter valid data!")
        }
        else {
            const existingProject = await projects.findOne({ _id: id })
            existingProject.title = title
            existingProject.description = desc
            existingProject.languages = languages
            existingProject.github = github
            existingProject.demo = demo
            existingProject.image = image

            existingProject.save()
            res.status(200).json(existingProject)
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.allProjects = async (req, res) => {
    try {
        const projectList = await projects.find()
        res.status(200).json(projectList)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}