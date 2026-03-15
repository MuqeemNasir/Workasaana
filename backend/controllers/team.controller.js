const Team = require('../models/Team.model')
const { z } = require('zod')
const logger = require('../utils/logger')

const teamSchema = z.object({
    name: z.string().min(2, "Team name must be at least 2 characters."),
    description: z.string().optional(),
    members: z.array(z.string()).optional()
})

const createTeam = async (req, res, next) => {
    try {
        const validatedData = teamSchema.parse(req.body)

        const teamExists = await Team.findOne({ name: validatedData.name })
        if(teamExists){
            logger.warn(`Failed to create team: ${validatedData.name} already exists.`)
            return res.status(400).json({message: "Team with this name already exists."});
        }

        const team = await Team.create({
            name: validatedData.name,
            description: validatedData.description,
            members: validatedData.members || []
        })

        logger.success(`Team created: ${team.name}`)
        res.status(201).json(team)
    }catch(error){
        next(error)
    }
}

const getAllTeams = async(req, res, next) => {
    try{
        const teams = await Team.find()
            .populate('members', 'name email')
            .lean()

        logger.info(`Fetched ${teams.length} teams`)
        res.status(200).json(teams)
    }catch(error){
        next(error)
    }
}

const getTeamById = async(req, res, next) => {
    try{
        const team = await Team.findById(req.params.id).populate('members', 'name email')
        if(!team){
            return res.status(404).json({message: 'Team not found.'})
        }

        res.status(200).json(team)
    }catch(error){
        next(error)
    }
}

const addMemberToTeam = async(req, res, next) => {
    try{
        const { userId } = req.body
        if(!userId) return res.status(400).json({message: 'User Id is required'})

        const team = await Team.findByIdAndUpdate(req.params.id,
            {$addToSet: {members: userId}},
            {new: true}
        ).populate('members', 'name email')

        res.status(200).json(team)
    }catch(error){
        next(error)
    }
}

module.exports = { createTeam, getAllTeams, getTeamById, addMemberToTeam}