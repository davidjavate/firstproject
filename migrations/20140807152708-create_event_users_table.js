module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable("event_users", {
    	id: {
    		type: DataTypes.INTEGER,
    		primaryKey: true,
    		autoIncrement: true
    	},
    	createdAt: DataTypes.DATE,
    	updatedAt: DataTypes.DATE,
		eventId: {
			foreignKey: true,
			type: DataTypes.INTEGER
		},
		userId: {
			foreignKey: true,
			type: DataTypes.INTEGER
		}
	})
	.complete(done)
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable("event_users")
    	.complete(done);
  
}
