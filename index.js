const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.get('/add/:input1/:input2', function(req, res) {
  const input1 = parseInt(req.params.input1)
  const input2 = parseInt(req.params.input2)

  const result = input1 + input2

  res.send(result.toString())
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

app.use(function(req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// gestion des formulaires

const express = require('express')
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

const app = express()

app.get('/', function(req, res) {
  res.send('Hello world !')
})

app.post('/form', urlEncodedParser, function(req, res) {
  console.log(req.body)
  res.send('form')
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

const express = require('express')
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

const app = express()

app.post('/concat', urlEncodedParser, function(req, res) {
  const concat = req.body.string1 + req.body.string2
  res.send(concat)
})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

//recupérer le contenu du fichier text.txt et l'afficher grâce à un callback

const fs = require('fs')

fs.readFile('./text.txt', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})

