const UserModel = (sequelize, type) => {
	return sequelize.define("User", {
		id: {
			type: type.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: type.STRING(16),
			allowNull: false,
		},
		fullname: {
			type: type.STRING(50),
			allowNull: false,
		},
		birthday: {
			type: type.DATEONLY,
			allowNull: false,
		},
		dni: {
			type: type.STRING(16),
			allowNull: false,
			unique: true,
		},
		email: {
			type: type.STRING(100),
			allowNull: false,
			unique: true,
		},
		password: {
			type: type.STRING(100),
			allowNull: false,
		},
		profileImage: {
			type: type.STRING(255),
			allowNull: false,
			defaultValue: "",
		},
		isActive: {
			type: type.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		isAdmin: {
			type: type.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	});
};

export default UserModel;
