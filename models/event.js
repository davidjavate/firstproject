module.exports = function (sequelize, DataTypes){

	var Event = sequelize.define('event', {
		title: DataTypes.STRING,
		date: DataTypes.DATE,
		djs: DataTypes.STRING, 
		body: DataTypes.TEXT,
		userId: {
			type: DataTypes.INTEGER,
			foreignKey: true
		},
		flyerlink: DataTypes.TEXT
	},
		{
      		classMethods: {
		        associate: function(db){
		          Event.hasMany(db.user, {through: db.event_users});
      		 	 }
        	}
 
});
return Event;
};
