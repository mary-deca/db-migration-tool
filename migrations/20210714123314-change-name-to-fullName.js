module.exports = {
	async up(db, client) {
		// TODO write your migration here.
		return db
			.collection('quotes')
			.updateMany({}, { $rename: { name: 'fullName' } });
	},

	async down(db, client) {
		// TODO write the statements to rollback your migration (if possible)
		return db
			.collection('quotes')
			.updateMany({}, { $rename: { fullName: 'name' } });
	},
};
