const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const mysql = require('mysql2')

app.use(bodyParser.json())
app.use(cors())

const db = mysql.createConnection({
  host : 'localhost',
  user : 'ronald916',
  password : '@ronaldXtra123',
  database : 'db_film'
})

app.get('/api/get', (req,res) => {
  db.query('SELECT * FROM films', (err, result) => {
    if(err){
      console.log(err)
    }
    res.json({
      query : result
    })
  })
})

app.get('/api/get/:id', (req,res) => {
  const id = req.params.id
  db.query('SELECT * FROM films WHERE id = ?',id, (err, result) => {
    if(err){
      console.log(err)
    }
    res.json({
      query : result
    })
  })
})

app.post('/api/post', (req,res) => {
  const film_title = req.body.film_title
  const released = req.body.released
  const studio = req.body.studio
  const worldwide_gross = req.body.worldwide_gross
  const domestic_gross = req.body.domestic_gross

  db.query(`INSERT INTO films (film_title,released,studio,worldwide_gross,domestic_gross) VALUES(?,?,?,?,?)`,[film_title,released,studio,worldwide_gross,domestic_gross] ,(err,result)=> {
    if(err){
      console.log(err)
    }
    res.json({
      message : "Data Berhasil Dibuat"
    })
  })
})

app.post('/api/edit/:id', (req,res) => {
  const id = req.params.id
  const film_title = req.body.film_title
  const released = req.body.released
  const studio = req.body.studio
  const worldwide_gross = req.body.worldwide_gross
  const domestic_gross = req.body.domestic_gross

  db.query(`UPDATE films SET film_title = ?,released = ?,studio = ?,worldwide_gross = ?,domestic_gross = ? WHERE id = ?`,[film_title,released,studio,worldwide_gross,domestic_gross,id] ,(err,result)=> {
    if(err){
      console.log(err)
    }
    res.json({
      message : "Data Berhasil Di Update"
    })
  })
})

app.get('/api/delete/:id', (req,res) => {
  const id = req.params.id

  db.query(`DELETE FROM films WHERE id = ?`,id ,(err,result)=> {
    if(err){
      console.log(err)
    }
    res.json({
      message : "Data Berhasil Dihapus"
    })
  })
})

app.listen(process.env.DB_PORT)
