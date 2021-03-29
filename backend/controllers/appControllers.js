import * as graphData from "../datasets/data-graphs.json";
import * as tableData from "../datasets/data-table.json";
import { comparePass, hashPass } from "../helpers/hashPass.js";
import { verifyRefreshToken } from "../helpers/verifyRefreshToken.js";
import {
	generateToken,
	generateRefreshToken,
} from "../helpers/generateTokens.js";
import pool from "../models/pool.js";
import {
	deleteToken,
	insertQuery,
	selectQuery,
	selectToken,
	updateWithToken,
} from "../models/queries.js";

//Controllers for all routes
export const loginPost = (req, res) => {
	const { email, password } = req.body;
	//   as we don't need data by waiting something, so we return the promise directly here
	return pool
		.query(selectQuery, [email])
		.then(async (result) => {
			const user = result.rows[0];
			const checkUser = comparePass(password, user.password);
			delete user.password;
			if (checkUser) {
				const token = generateToken(email);
				const refreshToken = generateRefreshToken(email);

				await pool.query(updateWithToken, [refreshToken, email]);
				res
					.status(200)
					.header({
						"Set-cookie": [
							"jwt=" + token + "; maxAge=1801; httpOnly=true; SameSite=None; Secure=true;",
							"refresh_token=" +
								refreshToken +
								"; maxAge=604800; httpOnly=true; SameSite=None; Secure=true;",
						],
						"Access-Control-Allow-Credentials": true,
					})
					.json({ ...user, token, refreshToken });
			} else {
				res.status(403).json({ msg: "Invalid authentication data" });
			}
		})
		.then((insertedToken) => insertedToken)
		.catch((e) => {
			console.log(e);
			res.status(500).json({ msg: JSON.stringify(e) });
		});
};

export const signUpPost = async (req, res) => {
	const { username, email, password } = req.body;

	const hashedPassword = hashPass(password);

	try {
		const newUser = await pool.query(insertQuery, [
			username,
			email,
			hashedPassword,
		]);
		const user = newUser.rows[0];
		delete user.password;
		const token = generateToken(email);
		const refreshToken = generateRefreshToken(email);
		await pool.query(updateWithToken, [refreshToken, email]);
		res
			.status(200)
			.header({
				"Set-cookie": [
					"jwt=" + token + "; maxAge=1801; httpOnly=true; SameSite=None; Secure=true;",
					"refresh_token=" + refreshToken + "; maxAge=604800; httpOnly=true; SameSite=None; Secure=true;",
				],
				"Access-Control-Allow-Credentials": true,
			})
			.json({ user, token, refreshToken });
		console.log("newUser", onlyUserData);
	} catch (err) {
		if (err.code === "23505") {
			res.status(409).json({
				msg: JSON.stringify(err.message),
				error: err,
			}); // error code 409 for conflict
		} else {
			res.status(500).json({ msg: JSON.stringify(err) });
		}
	}
};

export const dashboardGet = (req, res) => {
	try {
		res.status(200).json({ graphData, tableData });
	} catch (err) {
		res.status(404).json({
			msg: JSON.stringify(err.message),
			error: err,
		});
	}
};

export const logoutGet = async (req, res) => {
	const { email } = req.headers;
	try {
		if (email) {
			await pool.query(deleteToken, [email]);
			res
				.status(200)
				.cookie("jwt", "", { maxAge: 0 })
				.cookie("refresh_token", "", { maxAge: 0 })
				.end();
		} else {
			res.status(405).json({ msg: "Not allowed" });
		}
	} catch (err) {
		res.status(404).json({
			msg: JSON.stringify(err.message),
			error: err,
		});
	}
};

export const refreshTokenPost = async (req, res) => {
	const { refresh_token } = req.body;

	// no refresh token provided.
	if (!refresh_token) {
		return res.status(403).json({ msg: "Unauthenticated request." });
	}
	const userRecord = await pool
		.query(selectToken, [refresh_token])
		.then((res) => res.rows[0])
		.catch((e) => null);
	if (!userRecord) {
		return res.status(403).json({
			msg: "Unauthenticated request",
		});
	}
	const isValid = await verifyRefreshToken(refresh_token).catch((e) => false);
	if (isValid) {
		const { refresh_token, ...user } = userRecord;
		delete user.password;
		const token = generateToken(userRecord.email);
		res
			.cookie("jwt", token, { path: "/api", maxAge: 1800, httpOnly: true, sameSite: 'none', secure: true })
			.json({ token, refresh_token, ...user });
	} else {
		return res.status(403).json({
			msg: "Unauthenticated request",
		});
	}
};
