const Tag = require('../models/Tag.model')
const { z } = require('zod') 
const logger = require('../utils/logger')

const tagScheme = z.object({
    name: z.string().min(1, "Tag name is required.")
})

const createTag = async(req, res, next) => {
    try{
        const validatedData = tagScheme.parse(req.body)

        const tagExists = await Tag.findOne({name: validatedData.name})
        if(tagExists){
            return res.status(400).json({message: "Tag already exists."})
        }

        const tag = await Tag.create(validatedData)

        logger.success(`Tag Created: ${tag.name}`)
        res.status(201).json(tag)
    }catch(error){
        next(error)
    }
}

const getAllTags = async(req, res, next) => {
    try{
        const tags = await Tag.find()
        res.status(200).json(tags)
    }catch(error){
        next(error)
    }
}

module.exports = { createTag, getAllTags }