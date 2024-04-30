export class AppController {
	getHomePage(req, res) {
		res.status(200).render("home");
	}

	getError404Page(req, res) {
		res.status(404).render("error404Page");
	}
	getAccessDeniedPage(req, res) {
		res.render("accessDenied");
	}
}
