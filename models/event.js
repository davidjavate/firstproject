module.exports = function (sequelize, DataTypes){

	var Event = sequelize.define('event', {
		title: DataTypes.STRING,
		date: DataTypes.DATE,
		djs: DataTypes.STRING, 
		body: DataTypes.TEXT,
		userId: {
			type: DataTypes.INTEGER,
			foreignKey: true
		}
	},
		{
      		classMethods: {
		        associate: function(db){
		          Event.hasMany(db.user);
      		 	 }
        	}
 
});
return Event;
};
