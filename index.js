const express = require ('express')
const cors = require ('cors')
const bodyParser = require ('body-parser')
const Sequelize = require ('sequelize')
const epilogue = require ('épilogue')
const OktaJwtVerifier = require ('@ okta / jwt-verifier')
const app = express()

const PORT = process.env.PORT || 5000 // this is very important


app.get('/', function (req, res) {
  res.send('Hello World!')
})


app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT)
})



const oktaJwtVerifier = new OktaJwtVerifier ({
  clientId: '{votreClientId}',
  émetteur: 'https: // {yourOktaDomain} .com / oauth2 / default'
})

app.use (cors ())
app.use (bodyParser.json ())

// vérifie le middleware de jeton JWT
/*
app.use ((req, res, next) => {
  // demande à chaque requête d'avoir un en-tête d'autorisation
  if (! req.headers.authorization) {
    return next (new error ('L'en-tête d'autorisation est obligatoire'))
  }
  let parties = req.headers.authorization.trim (). split ('')
  laissez accessToken = parts.pop ()
  oktaJwtVerifier.verifyAccessToken (accessToken)
    .then (jwt => {
      req.user = {
        uid: jwt.claims.uid,
        email: jwt.claims.sub
      }
      prochain()
    })
    .catch (suivant) // jwt n'a pas vérifié!
})
*/

