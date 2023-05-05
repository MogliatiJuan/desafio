import { Router } from "express";
import { User } from "../db.js";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { checkActive, checkToken } from "./validationUser.js";
import multer from "multer";
import ftp from "basic-ftp";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
export const secretKey = crypto.randomBytes(64).toString("hex");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "C:xampp/htdocs/Img");
	},
	filename: function (req, file, cb) {
		const date = Date.now();
		cb(null, `${date}_${file.originalname}`);
	},
});

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error("Only JPEG, JPG & PNG files is permitted."));
		}
		cb(null, true);
	},
});

async function connection(req) {
	const client = new ftp.Client();
	client.ftp.verbose = true;
	let ftpFile = "";
	try {
		await client.access({
			host: process.env.HOST,
			port: process.env.PORT,
			user: process.env.USER,
			password: process.env.PASSWORD,
		});
		ftpFile = `FTP_${req.file.filename}`;
		await client.uploadFrom(
			`C:xampp/htdocs/Img/${req.file.filename}`,
			`/${ftpFile}`
		);
		fs.unlinkSync(`C:xampp/htdocs/Img/${req.file.filename}`);
	} catch (error) {
		console.log(error);
	}
	return ftpFile;
}

router.post(
	"/register",
	[
		check("name", "Name is required").not().isEmpty(),
		check("fullname", "Fullname is required").not().isEmpty(),
		check("birthday", "Invalid date").isDate({ format: "YYYY-MM-DD" }),
		check("dni", "DNI is required").not().isEmpty(),
		check("email", "Invalid email address").isEmail(),
		check("password", "Password is required").not().isEmpty(),
	],
	upload.single("profileImage"),
	async (req, res) => {
		try {
			if (!req.file) {
				throw new Error("No se ha subido ninguna imagen");
			}
			const ftp = await connection(req);
			req.body.password = await bcrypt.hash(req.body.password, 10);
			req.body.profileImage = `http://localhost/Img/${ftp}`;
			const user = await User.create(req.body);
			res.status(200).send({
				status: "success",
				message: "User registered",
				email: user.email,
			});
		} catch (error) {
			console.log(error);
			res.status(400).send({
				status: "error",
				message: error.message,
			});
		}
	}
);

router.get("/profile/:id", checkToken, async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findByPk(userId);
		res.status(200).send(user);
	} catch (error) {
		console.log(error);
		res.status(500).send({ status: "error", message: error.message });
	}
});

router.post(
	"/login",
	[
		check("email", "Invalid email address").isEmail(),
		check("password", "Password is required").not().isEmpty(),
	],
	checkActive,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).send({ status: "error", errors: errors.array() });
		}
		try {
			const user = await User.findOne({ where: { email: req.body.email } });
			if (user) {
				const comparison = await bcrypt.compare(
					req.body.password,
					user.password
				);
				if (comparison) {
					const payload = {
						id: user.id,
						email: user.email,
						name: user.name,
						fullname: user.fullname,
						dni: user.dni,
						birthday: user.birthday,
					};
					const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
					res.status(200).send({ status: "success", token: token });
				} else {
					res
						.status(401)
						.send({ status: "error", message: "Invalid password" });
				}
			} else {
				res.status(401).send({ status: "error", message: "Invalid email" });
			}
		} catch (error) {
			console.log(error);
			res.status(400).send();
		}
	}
);

router.put(
	"/profile",
	checkToken,
	[check("email", "Invalid email address").isEmail()],
	checkActive,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).send({ status: "error", errors: errors.array() });
		}
		try {
			const {
				name,
				fullname,
				birthday,
				dni,
				email,
				oldPassword,
				newPassword,
				profileImage,
			} = req.body;

			const user = await User.findByPk(req.user.id);
			const validatePassword = await bcrypt.compare(oldPassword, user.password);
			if (!validatePassword) {
				res.status(401).send({ status: "error", message: "Invalid password" });
			}
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			await user.update({
				name,
				fullname,
				birthday,
				dni,
				email,
				profileImage,
				password: hashedPassword,
			});
			res.status(200).send({ message: "Profile updated succesfully" });
		} catch (error) {
			console.log(error);
			res.status(400).send({ status: "error", message: error.message });
		}
	}
);

export default router;
