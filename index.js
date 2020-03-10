const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000 // this is very important
function test(){
	console.log("test")
}


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/test', function (req, res) {
  res.send(test())
})

app.get('/creer', function (req, res) {
  res.send()
  creer_article()
  console.log("test")
})

app.get('/liste', function (req, res) {
  res.send(req)
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})
