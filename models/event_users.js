module.exports = function(sequelize, DataTypes) {
	var EventUsers = sequelize.define("event_users", {
		eventId: {
			foreignKey: true,
			type: DataTypes.INTEGER
		},
		userId: {
			foreignKey: true,
			type: DataTypes.INTEGER
		}
	},
	{
		classMethods: {
			associate: function(db){
				EventUsers.belongsTo(db.user);
				EventUsers.belongsTo(db.event);
			}
		}
	});
	return EventUsers;
};