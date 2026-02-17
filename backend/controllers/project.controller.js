const Project = require('../models/Project.model')
const { z } = require('zod')
const logger = require('../utils/logger')

const projectSchema = z.object({
    name: z.string().min(1, "Project name is required"),
    description: z.string().optional()
})

const createProject = async (req, res, next) => {
    try {
        const validatedData = projectSchema.parse(req.body)

        const existingProject = await Project.findOne({ name: validatedData.name })
        if (existingProject) {
            return res.status(400).json({ message: "Project with this name already exists." })
        }

       const project = await Project.create(validatedData)

       logger.success(`Project Created: ${project.name}`)
       res.status(201).json({ success: true, data: project })
    } catch (error) {
        next(error)
    }
}

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
        logger.info(`Fetched ${projects.length} projects`)
        res.status(200).json({ success: true, count: projects.length, data: projects })
    } catch (error) {
       next()
    }
}

module.exports = { createProject, getAllProjects }