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

testingRouter.post("/services", async (req, res) => {
  const connection = connect()

  try {
    await connection.query(`INSERT INTO servicios (nombre, precio, descripcion, id_servicios, imagen_link) VALUES (?, ?, ?, ?, ?)`, ["Fotografía de evento", 45000, "1 Hr Todas las fotografías editadas en digital", randomUUID(), "https://firebasestorage.googleapis.com/v0/b/blacksharkstudiosweb.appspot.com/o/service%2Fpublicidad_digital.jpg?alt=media&token=14dce7ab-fde8-478f-adc5-d2a4a61c9014"])
    await connection.query(`INSERT INTO servicios (nombre, precio, descripcion, id_servicios, imagen_link) VALUES (?, ?, ?, ?, ?)`, ["3 Campaña Facebook/Instagram", 350000, "1 MES y Publicación 8 Post + 1 Campaña + inversión de campaña", randomUUID(), "https://firebasestorage.googleapis.com/v0/b/blacksharkstudiosweb.appspot.com/o/service%2Fcampa%C3%B1a_facebook_instragram3.jpg?alt=media&token=e2145c2b-b2bd-483f-8a57-89e15515228f"])
    
    return res.status(201).json({ message: "Services created!" })
  } catch (error) {
    return res.status(500).json(error)
  } finally {
    if (connection) {
      connection.end()
    }
  }
})

export default testingRouter