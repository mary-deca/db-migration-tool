module.exports = {
	async up(db, client) {
		// TODO write your migration here.
		return await db.collection('quotes').updateMany(
			{},
			{
				$set: {
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			}
		);
	},

	async down(db, client) {
		// TODO write the statements to rollback your migration (if possible)
		return db
			.collection('quotes')
			.updateMany({}, { $unset: { createdAt: null, updatedAt: null } });
	},
};
