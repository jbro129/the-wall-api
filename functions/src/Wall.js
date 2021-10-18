const admin = require('firebase-admin')
const secret = require('./secrets.json')

function firestore() {
	if (!admin.apps.length) {
		admin.initializeApp({
			credential: admin.credential.cert(secret),
		})
	}
	return admin.firestore()
}

exports.getWallPosts = (req, res) => {
	const db = firestore()

	db.collection('wall')
		.orderBy('created_at', 'desc')
		.get()
		.then((collection) => {
			const wallPosts = collection.docs.map((doc) => {
				let post = doc.data()
				post.id = doc.id
				return post
			})
			res.set('Cache-Control', 'public, max-age=60, s-maxage=60')
			res.send(wallPosts)
		})
		.catch((err) =>
			res.status(500).send('Error getting wall posts: ' + err.message)
		)
}

exports.postToWall = (req, res) => {
	const { uid, text, displayName } = req.body

	if (!req.body || !text || !displayName) {
		res.status(400).send('Invalid request')
	}
	const db = firestore()

	const now = admin.firestore.FieldValue.serverTimestamp()
	const newWallPost = {
		uid,
		created_at: now,
		text,
		displayName,
	}
	db.collection('wall')
		.add(newWallPost)
		.then(() => {
			this.getWallPosts(req, res)
		})
		.catch((err) =>
			res.status(500).send('Error posting to wall: ' + err.message)
		)
}
