module.exports = {
	async up(db, client) {
		// TODO write your migration here.
		return db.collection('quotes').deleteMany({});
	},

	async down(db, client) {
		// TODO write the statements to rollback your migration (if possible)
	  // We can't recover deleted documents...
    return Promise.resolve('ok')
	},
};
