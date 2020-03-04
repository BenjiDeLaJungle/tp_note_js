const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000 // this is very important
function creer_article(){
	console.log("test")
}


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/tg', function (req, res) {
  res.send('TG SAMUEL!')
})

app.get('/creer', function (req, res) {
  res.send(creer_article())
})

app.get('/liste', function (req, res) {
  res.send(req)
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})
