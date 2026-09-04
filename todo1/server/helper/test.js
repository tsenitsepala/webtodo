import fs from 'fs/promises'
import path from 'path'
import jwt from 'jsonwebtoken'
import { hash } from 'bcrypt'
import { pool } from './db.js'
import 'dotenv/config'

const __dirname = import.meta.dirname

const insertTestUser = async (user) => {
  const hashedPassword = await hash(user.password, 10)

  await pool.query(
    'INSERT INTO account (email, password) VALUES ($1, $2)',
    [user.email.toLowerCase(), hashedPassword]
  )
}

const initializeTestDb = async () => {
  const sql = await fs.readFile(
    path.resolve(__dirname, '../db.sql'),
    'utf8'
  )

  await pool.query(sql)
}

const getToken = (email) => {
  return jwt.sign(
    { email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1h' }
  )
}

export {
  initializeTestDb,
  insertTestUser,
  getToken
}
