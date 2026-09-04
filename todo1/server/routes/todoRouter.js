import { Router } from 'express'
import { pool } from '../helper/db.js'
import { auth } from '../helper/auth.js'
import { 
    getAllTasks,
    createTask, 
    removeTask
} from '../controllers/TaskController.js'

const router = Router()

router.get('/', getAllTasks)

router.post('/', auth, createTask)

router.delete('/:id', auth, removeTask)

export default router
/*

router.get('/', (req, res, next) => {
  pool.query('SELECT * FROM task', (err, result) => {
    if (err) {
      return next(err)
    }

    return res.status(200).json(result.rows)
  })
})

router.post('/', auth, (req, res, next) => {
  const { task } = req.body

  if (!task || !task.description) {
    return res.status(400).json({
      error: 'Task is required'
    })
  }

  pool.query(
    'INSERT INTO task (description) VALUES ($1) RETURNING *',
    [task.description],
    (err, result) => {
      if (err) {
        return next(err)
      }

      return res.status(201).json({
        id: result.rows[0].id,
        description: result.rows[0].id, description: task.description
      })
    }
  )
})

router.delete('/:id', auth, (req, res, next) => {
  const { id } = req.params

  pool.query(
    'DELETE FROM task WHERE id = $1 RETURNING id',
    [id],
    (err, result) => {
      if (err) {
        return next(err)
      }

      if (result.rowCount === 0) {
        const error = new Error('Task not found')
        error.status = 404
        return next(error)
      }

      return res.status(200).json(result.rows[0])
    }
  )
})

export default router '*/