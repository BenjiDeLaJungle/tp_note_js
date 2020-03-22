const bodyParser = require('body-parser')
const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const secret = 'thisismysecret'
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

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

passport.use(jwtStrategy)

const app = express()

app.get('/public', (req, res) => {
  res.send('I am public folks!')
})

app.get('/get', (req, res) => {
  res.send('I am public folks!')
})

app.get('/getAll', (req, res) => {
  res.send('I am public folks!')
})

app.get('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('Hello create' + req.user.email)
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
  res.send(email)
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



