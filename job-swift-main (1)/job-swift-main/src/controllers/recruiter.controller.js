import { jobs, skills } from "../models/job.model.js";

export class RecruiterController {
	getCreateJobPage(req, res) {
		res.status(200).render("createJob", { skills: skills });
	}

	getUpdateJobPage(req, res) {
		const id = parseInt(req.params.id);
		const job = jobs.find((j) => j.id === id);

		if (!job) res.status(404).redirect("/404");
		else res.status(200).render("updateJob", { job: job, skills: skills });
	}

	getApplicantsPage(req, res) {
		const id = parseInt(req.params.id);
		const job = jobs.find((j) => j.id === id);

		res.status(200).render("applicantsPage", {
			applicants: job.applicants,
			role: job.jobDesignation,
			companyName: job.companyName,
		});
	}

	getAllApplicantsPage(req, res) {
		res.status(200).render("allApplicantsPage", { jobs: jobs });
	}

	handleCreateJob(req, res) {
		const skillsRqd = [];

		skills.forEach((s) => {
			if (req.body[s] === "on") skillsRqd.push(s);
		});

		jobs.push({
			id: jobs.length + 1,
			companyName: req.body.companyName,
			jobCategory: req.body.jobCategory,
			jobDesignation: req.body.jobDesignation,
			jobLocation: req.body.jobLocation,
			salary: req.body.salary,
			numberOfOpenings: req.body.numberOfOpenings,
			skillsRequired: skillsRqd,
			applyBy: req.body.applyBy,
			jobPosted: Date.now(),
			applicants: [],
		});
		res.status(200).redirect("/jobs");
	}

	handleUpdateJob(req, res) {
		const id = parseInt(req.params.id) - 1;

		if (id > jobs.length || id < 0) res.status(404).render("/404");

		const skillsRqd = [];

		skills.forEach((s) => {
			if (req.body[s] === "on") skillsRqd.push(s);
		});

		jobs[id].companyName = req.body.companyName;
		jobs[id].jobCategory = req.body.jobCategory;
		jobs[id].jobDesignation = req.body.jobDesignation;
		jobs[id].jobLocation = req.body.jobLocation;
		jobs[id].salary = req.body.salary;
		jobs[id].numberOfOpenings = req.body.numberOfOpenings;
		jobs[id].skillsRequired = skillsRqd;
		jobs[id].applyBy = req.body.applyBy;

		res.status(200).redirect("/jobs/" + id + 1);
	}

	handleDeleteJob(req, res) {
		const id = parseInt(req.params.id) - 1;
		
		try {
			jobs.splice(id, 1);
			res.status(200).send({
				goto: "http://localhost:3000/jobs",
			});
		} catch (err) {
			res.status(200).send({
				goto: "http://localhost:3000/404",
			});
		}
	}
}
