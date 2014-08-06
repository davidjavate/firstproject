module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable('events',{
    	id: {
    		type: DataTypes.INTEGER,
    		primaryKey: true,
    		autoIncrement: true
    	},
    	createdAt: DataTypes.DATE,
    	updatedAt: DataTypes.DATE,
    	title: DataTypes.STRING,
    	date: DataTypes.DATE,
    	djs: DataTypes.STRING,
    	body: DataTypes.TEXT,
    	userId: {
    		type: DataTypes.INTEGER,
    		foreignKey: true
    	}
    })
    	.complete(done);
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropTable('posts')
    .complete(done)
  }
}
