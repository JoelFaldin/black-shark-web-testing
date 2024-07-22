import express from "express"
import { randomUUID } from "crypto"
import bcrypt from "bcrypt"

import { connect } from "../utils/db"
import { validateTestUser } from "../schemas/testingSchema"

const testingRouter = express.Router()

testingRouter.post("/reset", async (req, res) => {
  const connection = connect()

  try {
    await connection.query(`DELETE FROM usuario`)
    await connection.query(`DELETE FROM servicios`)
    return res.status(201).json({ message: "Users and services from testing database cleaned!" })
  } catch (error) {
    return res.status(500).json(error)
  } finally {
    if (connection) {
      connection.end()
    }
  }
})

testingRouter.post("/user", async (req, res) => {
  const connection = connect()

  const verifyTestingData = validateTestUser(req.body)

  if (verifyTestingData.error) {
    return res.status(400).json({ message: JSON.parse(verifyTestingData.error.message)[0].message })
  }

  try {
    const salt = 10
    const hashedPassword = await bcrypt.hash(verifyTestingData.data.password, salt)

    const user = {
      id_usuario: randomUUID(),
      username: verifyTestingData.data.username,
      password: hashedPassword,
      email: verifyTestingData.data.email,
      tipo_user: "user"
    }

    await connection.query(`INSERT INTO usuario
      (id_usuario, username, contrasenha, correo, tipo_user)
      VALUES (?, ?, ?, ?, ?)
    `, [user.id_usuario, user.username, user.password, user.email, user.tipo_user])

    return res.status(201).json({ message: "User created!" })
  } catch (error) {
    return res.status(500).json(error)
  } finally {
    if (connection) {
      connection.end()
    }
  }
})

testingRouter.post("/admin", async (req, res) => {
  const connection = connect()

  try {
    const salt = 10
    const hashedPassword = await bcrypt.hash("adminpassword", salt)

    const admin = {
      id_usuario: randomUUID(),
      username: "admintest",
      password: hashedPassword,
      email: "admin@gmail.com",
      tipo_user: "admin"
    }

    await connection.query(`INSERT INTO usuario
      (id_usuario, username, contrasenha, correo, tipo_user)
      VALUES (?, ?, ?, ?, ?)
    `, [admin.id_usuario, admin.username, admin.password, admin.email, admin.tipo_user])

    return res.status(201).json({ message: "Admin created!" })
  } catch (error) {
    return res.status(500).json(error)
  } finally {
    if (connection) {
      connection.end()
    }
  }
})

export default testingRouter