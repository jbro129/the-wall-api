const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const { getWallPosts, postToWall } = require('./src/Wall')

const app = express()
//const port = 3000

app.use(cors())
app.use(express.json())

// Get the wall posts
app.get('/wall', getWallPosts)

// Post to the wall
app.post('/wall', postToWall)

// app.listen(port, () => {
//    console.log('Listening to http://localhost:' + port)
// })

exports.app = functions.https.onRequest(app)
