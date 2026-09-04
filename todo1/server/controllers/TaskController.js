import { 
    selectAllTasks,
    insertTask,
    deleteTask
} from '../models/Task.js'

import { ApiError } from '../helper/ApiError.js'

const getAllTasks = async (req, res, next) => {
    try {
        const result = await selectAllTasks()
        return res.status(200).json(result.rows || [])
    } catch (error) {
        return next(error)
    }
}

const createTask = async (req, res, next) => {
    try {
        const { task } = req.body

        if (!task || !task.description || task.description.trim().length === 0) {
        
            return next(
                new ApiError('Task description is required', 400))
            }

        const result = await insertTask(task.description)

        return res.status(201).json(result.rows[0])
    } catch (error) {
        return next(error)
    }
    }

    const removeTask = async (req, res, next) => {
        try {
            const { id } = req.params

        const result = await deleteTask(id)

        if(result.rowCount === 0) {
            return next(
                new ApiError('Task not found', 404)
            )
    }
    return res.status(200).json(result.rows[0])
} catch (error) {
    return next(error)
}
    }

    export {
    getAllTasks,
    createTask,
    removeTask
    
}