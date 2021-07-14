const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config();

const mongoDBUri = process.env.MONGODB_URI;
const app = express();

app.use(express.json());

app.listen(4003, function () {
	console.log('listening on port 4003');
});

MongoClient.connect(
	mongoDBUri,
	{
		useUnifiedTopology: true,
		useUnifiedTopology: true,
	},
	(err, client) => {
		if (err) return console.error(err);
		console.log('Connected to Database');
		const db = client.db('popular-quotes');
		const quotesCollection = db.collection('quotes');

		app.get('/', (req, res) => {
			res.send('Hello World');
		});

		app.get('/quotes', async (req, res) => {
			try {
				const cursor = await db.collection('quotes').find().toArray();
				console.log(cursor);
			} catch (error) {
				console.error(error);
			}
		});

		app.post('/quotes', async (req, res) => {
			try {
				const { fullName, quote } = req.body;
				const result = await quotesCollection.insertOne({
					fullName,
					quote,
					createdAt: new Date(),
					updatedAt: new Date(),
				});
			} catch (error) {
				console.error(error);
			}
		});

		app.put('/quotes', async (req, res) => {
			try {
				const { fullName, quote } = req.body;
				const result = await quotesCollection.findOneAndUpdate(
					{ fullName },
					{
						$set: { fullName, quote, updatedAt: new Date() },
					},
					{ upsert: true }
				);
				res.json('Success');
			} catch (error) {
				console.error(error);
			}
		});

		app.delete('/quotes', async (req, res) => {
			try {
				const { fullName } = req.body;
				const result = await quotesCollection.deleteOne({ fullName });
				if (result.deletedCount === 0) {
					return res.json('No quote to delete');
				}
				res.json(`Deleted ${fullName}'s quote`);
			} catch (error) {
				console.error(error);
			}
		});
	}
);
