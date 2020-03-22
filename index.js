const bodyParser = require('body-parser')
const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const secret = 'thisismysecret'
const urlEncodedParser = bodyParser.urlencoded({ extended: false })
const axios =require('axios')
const cors= require('cors')
const PORT = process.env.PORT || 5000

const users = [{ email: 'admin@admin.tp', password: 'azertyuiop' }]

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, next) {
  // usually this would be a database call:
  const user = users.find(user => user.email === payload.user)

  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
})

const configuration={
	'cache-control': 'no-cache',
	'x-apikey': 'd656debfa8368f27079ad50d8deca4fb000fb',
	'content-type': 'application/json',
	
}

passport.use(jwtStrategy)

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World ;)')
})

app.get("/get/:id", function (req, res) {
    axios({
        method: 'GET',
  		url: 'https://tpnote-0174.restdb.io/rest/articles?q={"id":"'+req.params.id+'"}',
  		headers: 
   			{ 'cache-control': 'no-cache',
     		'x-apikey': 'd656debfa8368f27079ad50d8deca4fb000fb' 
     		}
        })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        res.status(401).json({
            error: {error}
        });
    });
})


app.get("/getAll", function (req, res) {
    axios({
        method: 'GET',
  		url: 'https://tpnote-0174.restdb.io/rest/articles',
  		headers: 
   			{ 'cache-control': 'no-cache',
     		'x-apikey': 'd656debfa8368f27079ad50d8deca4fb000fb' 
     		}
        })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        res.status(401).json({
            error: {error}
        });
    });
})

app.post('/create'/*, passport.authenticate('jwt', { session: false })*/, function(req, res) {
axios({
	method: 'POST',
  	url: 'https://tpnote-0174.restdb.io/rest/articles',
  	headers: 
   		{ 'cache-control': 'no-cache',
     	'x-apikey': 'd656debfa8368f27079ad50d8deca4fb000fb',
     	'content-type': 'application/json' },
  	data:{
  		nom_article: req.body.nom_article,
  		contenu: req.body.contenu,
  		date_publication: req.body.date_publication,
  		id_auteur: req.body.id_auteur
  	},
  	responseType:'json',
  })
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        res.status(401).json({
            error: {error}
        });
    });
})



app.get('/update', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('Hello update ' + req.user.email)
})

app.get('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('Hello delete' + req.user.email)
})

app.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('Hello private' + req.user.email)
})

app.post('/register', urlEncodedParser, function(req, res) {
  const email = req.body.email
  const password = req.body.password
})

app.post('/login', urlEncodedParser, (req, res) => {

  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(401).json({ error: 'Email or password was not provided.' })
    return
  }

  // usually this would be a database call:
  const user = users.find(user => user.email === email)

  if (!user || user.password !== password) {
    res.status(401).json({ error: 'Email / password do not match.' })
    return
  }

  const userJwt = jwt.sign({ user: user.email }, secret)

  res.json({ jwt: userJwt })
})


app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})



