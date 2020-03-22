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



/*const oktaJwtVerifier = new OktaJwtVerifier ({
  clientId: '{votreClientId}',
  émetteur: 'https: // {yourOktaDomain} .com / oauth2 / default'
})

app.use (cors ())
app.use (bodyParser.json ())
*/
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

