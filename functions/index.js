const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')

const app = express()
//const port = 3000


app.use(cors())
app.use(express.json())

//app.get('/', (req, res) => res.send(''))


// app.listen(port, () => {
//    console.log('Listening to http://localhost:' + port)
// })
  
  exports.app = functions.https.onRequest(app)