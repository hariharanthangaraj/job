import { jobs } from "../models/job.model.js";
import sendMail  from "../functions/sendEmail.function.js";

export class JobController {
	getJobListingsPage(req, res) {
		res.status(200).render("jobListings", { jobs: jobs, userEmail: req.session.userEmail, lastVisit: res.locals.lastVisit });
	}

	getJobDetailsPage(req, res) {
		const id = parseInt(req.params.id);
		const job = jobs.find((j) => j.id === id);

		if (!job) res.redirect("/404");

		try {
			const givenDate = new Date(job.applyBy);
			const dateStr = givenDate.toDateString().split(" ");
			const applyBy = dateStr[2] + " " + dateStr[1] + " " + dateStr[3];

			const date1 = new Date(job.jobPosted);
			const date2 = new Date();

			const differenceInMilliseconds = Math.abs(
				date2.getTime() - date1.getTime()
			);
			const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
			job.diff = Math.floor(
				differenceInMilliseconds / oneDayInMilliseconds
			);

			if (job.diff === 0) job.diff = "Today";
			else if (job.diff === 1) job.diff = "Yesterday";
			else job.diff += " days ago";

			res.status(200).render("jobDetails", {
				job: job,
				applyBy: applyBy,
                userEmail: req.session.userEmail
			});
		} catch (err) {
			console.log(err);
		}
	}

	getJobApplyPage(req, res) {
		const id = parseInt(req.params.id);
		const job = jobs.find((j) => j.id === id);
		res.status(200).render("jobApply", {
			jobId: id,
			designation: job.jobDesignation,
			companyName: job.companyName,
		});
	}

	handleJobSearch(req, res) {
		const searchQuery = req.body.search;
		const filteredItems = jobs.filter((job) =>
			job.jobDesignation.toLowerCase().includes(searchQuery.toLowerCase())
		);

		if (filteredItems.length > 0)
			res.status(200).render("searchPage", { jobs: filteredItems, userEmail: req.session.userEmail });
		else res.status(404).redirect("/404");
	}

	handleJobApply(req, res) {
		const id = parseInt(req.body.id);
		const job_idx = jobs.findIndex((j) => j.id === id);

		const resumePath = `/uploads/${req.file.filename}`;

		jobs[job_idx].applicants.push({
			name: req.body.name,
			email: req.body.email,
			contact: req.body.contact,
			resumePath: resumePath,
		});

        
		res.status(200).redirect("/jobs");
        sendMail(
            req.body,
            jobs[job_idx].jobDesignation,
            jobs[job_idx].companyName
        );
	}
}
