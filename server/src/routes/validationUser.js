import jwt from "jsonwebtoken";
import { secretKey } from "./users.routes.js";
import { User } from "../db.js";

export const checkToken = async (req, res, next) => {
	if (!req.headers["user-token"]) {
		return res.status(401).send("No token sent. Login");
	} else {
		try {
			const userToken = req.headers["user-token"];
			let payload = {};
			payload = jwt.verify(userToken, secretKey, { ignoreExpiration: false });
			req.user = payload;
			return next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).send("Token expired");
			} else {
				return res.status(401).send("Invalid token");
			}
		}
	}
};

export const checkActive = async (req, res, next) => {
	try {
		console.log(req.body);
		const user = await User.findOne({ where: { email: req.body.email } });
		console.log(user);
		if (!user.isActive) {
			return res.status(401).send("User not active");
		} else {
			return next();
		}
	} catch {
		return res.status(401).send("User not found. Provide a valid email ");
	}
};
