module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
    	'events',
    	'flyerlink',
    	{
    		type: DataTypes.TEXT,
    	}
    	)
    .complete(done);
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.removeColumn('events','flyerlink')
    .complete(done);
  }
};
