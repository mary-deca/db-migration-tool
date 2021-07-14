module.exports = {
	async up(db, client) {
		return await db
			.collection('quotes')
			.updateMany({}, { $set: { likes: 10 } });
	},

	async down(db, client) {
		return await db
			.collection('quotes')
			.updateMany({}, { $unset: { likes: null } });
	},
};
