const express = require('express')
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerMiddleware = require('../Middlewares/multerMiddleware')

const routes = express.Router()

// User Controller Routes
routes.post('/register',  userController.userRegistration)
routes.post('/login',  userController.userLogin)
routes.put('/editprofile', jwtMiddleware, multerMiddleware.single('profile'), userController.profileUpdate)

// Project Controller Routes
routes.get('/getallprojects', projectController.allProjects)
routes.post('/addproject', jwtMiddleware, multerMiddleware.single('image'),  projectController.addProject)
routes.get('/allprojects', jwtMiddleware, projectController.getProjects)
routes.delete('/deleteProject/:id', jwtMiddleware, projectController.deleteProject)
routes.put('/editproject/:id', jwtMiddleware, multerMiddleware.single('image'), projectController.updateProject)


module.exports = routes