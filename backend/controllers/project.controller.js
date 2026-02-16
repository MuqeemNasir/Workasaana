const Project = require('../models/Project.model')
const { z } = require('zod')

const projectSchema = z.object({
    name: z.string().min(1, "Project name is required"),
    description: z.string().optional()
})

const createProject = async (req, res) => {
    try {
        const validatedData = projectSchema.parse(req.body)

        const existingProject = await Project.findOne({ name: validatedData.name })
        if (existingProject) {
            return res.status(400).json({ message: "Project with this name already exists." })
        }

        const newProject = new Project(validatedData)
        await newProject.save()

        res.status(201).json({ success: true, data: newProject })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors })
        }
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
        res.status(200).json({ success: true, count: projects.length, data: projects })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

module.exports = { createProject, getAllProjects }