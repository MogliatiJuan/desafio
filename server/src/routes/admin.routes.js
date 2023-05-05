import { Router } from "express";
import { checkToken } from "./validationUser.js";
import { User } from "../db.js";
import { validationAdmin } from "./validationAdmin.js";

const router = Router();

router.get("/", checkToken, async (req, res) => {
	try {
		const userId = req.user.id;
		const user = await User.findByPk(userId);
		if (user.isAdmin) {
			const users = await User.findAll();
			res.status(200).send(users);
		} else {
			res.status(200).send(`Welcome ${user.name}`);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ status: "error", message: error.message });
	}
});

router.put("/users/:id", checkToken, validationAdmin, async (req, res) => {
	try {
		const {
			name,
			fullname,
			birthday,
			dni,
			email,
			profileImage,
			isActive,
			isAdmin,
		} = req.body;
		const userData = {
			name,
			fullname,
			birthday,
			dni,
			email,
			profileImage,
			isActive,
			isAdmin,
		};
		const updatedUser = await User.update(userData, {
			where: { id: req.params.id },
		});
		if (!updatedUser) {
			res.status(404).send({ status: "error", message: "User not found" });
		} else {
			res.status(200).send(updatedUser);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ status: "error", message: error.message });
	}
});

router.put(
	"/users/:id/desactivate",
	checkToken,
	validationAdmin,
	async (req, res) => {
		try {
			const { id } = req.params;
			const user = await User.findByPk(id);
			if (!user) {
				res.status(404).send({ status: "error", message: "User not found" });
			} else {
				await user.update({ isActive: false });
				res.status(200).send({ message: "User desactivated succesfully" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).send({ status: "error", message: error.message });
		}
	}
);

export default router;
