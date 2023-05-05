import { User } from "../db.js";

export const validationAdmin = async (req, res, next) => {
	const userId = req.user.id;
	const user = await User.findByPk(userId);
	if (user.isAdmin) {
		return next();
	} else {
		return res
			.status(403)
			.send({ message: "You don't have enough permissions to do this action" });
	}
};
