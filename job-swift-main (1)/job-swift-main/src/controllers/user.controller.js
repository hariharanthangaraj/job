import { recruiters } from "../models/recruiter.model.js";

export class UserController {
	getLoginPage(req, res) {
		res.status(200).render("login");
	}
	getRegisterPage(req, res) {
		res.status(200).render("register");
	}

	handleLogin(req, res) {

		const user = recruiters.findIndex(
			(rec) =>
				rec.email == req.body.email && rec.password == req.body.password
		);

		if (user === -1) return res.status(401).redirect("/access-denied");

		req.session.userEmail = req.body.email;
        res.cookie('loginCookie', "login", {
            maxAge: 2 * 24 * 60 * 60 * 1000,
        });

		res.status(200).redirect("/jobs");
	}

	handleRegister(req, res) {
		const user = recruiters.findIndex(
			(rec) =>
				rec.email == req.body.email && rec.password == req.body.password
		);

		if (user !== -1) return res.status(401).render("register");

		recruiters.push({
			id: recruiters.length + 1,
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
	
		res.status(200).render("login");
	}

	handleLogout(req, res) {
		
		if (req.session) {
			req.session.destroy((err) => {
				if (err) console.log(err);
				else res.status(200).redirect("/");
			});
		} else {
			res.status(200).redirect("/");
		}
	}
}
