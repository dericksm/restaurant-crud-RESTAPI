const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	create: async function (req, res, next) {
		let checkUser = await userModel.findOne({ "name": req.body.name })
		console.log(checkUser)
		if (checkUser != null) {
			res.status(400).json({status: "fail", message: "User already exists", data: null});
		} else {
			console.log(req.body)
			userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
				if (err)
					next(err);
				else
					res.status(200).json({ status: "success", message: "User added", data: null });

			});
		}



	},

	authenticate: function (req, res, next) {
		userModel.findOne({ email: req.body.email }, function (err, userInfo) {
			if (err) {
				next(err);
			} else {
				// if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
				if (userInfo != null && req.body.password == userInfo.password) {

					const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });

					res.json({ status: "success", message: "user found", data: { user: userInfo, token: token } });

				} else {

					res.status(400).json({ status: "error", message: "Invalid email/password", data: null });

				}
			}
		});
	},

}					
