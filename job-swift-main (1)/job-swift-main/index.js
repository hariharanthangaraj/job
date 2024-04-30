import express from "express";
import path from "path";

import ejsLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";

import { resumeUpload } from "./src/functions/resumeUpload.function.js";
import { auth } from "./src/middlewares/auth.middleware.js";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";

import { AppController } from "./src/controllers/app.controller.js";
import { JobController } from "./src/controllers/job.controller.js";
import { RecruiterController } from "./src/controllers/recruiter.controller.js";
import { UserController } from "./src/controllers/user.controller.js";

const app = express();

app.use(express.static("public"));
app.use(ejsLayouts);
app.use(cookieParser());
app.use(
	session({
		secret: "mySecretKey",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const appController = new AppController();
const userController = new UserController();
const jobController = new JobController();
const recController = new RecruiterController();

// Unrestricted routes

app.get("/", appController.getHomePage);

app.get("/login", userController.getLoginPage);
app.get("/register", userController.getRegisterPage);
app.get("/logout", userController.handleLogout);

app.post("/login", userController.handleLogin);
app.post("/register", userController.handleRegister);

app.get("/jobs", setLastVisit, jobController.getJobListingsPage);
app.post("/search", setLastVisit, jobController.handleJobSearch);

app.get("/jobs/:id", jobController.getJobDetailsPage);

app.get("/apply/:id", jobController.getJobApplyPage);
app.post(
	"/apply/:id",
	resumeUpload.single("resume"),
	jobController.handleJobApply
);

// Restricted routes to Recruiters

app.post("/jobs", auth, recController.handleCreateJob);

app.get("/create-job", auth, recController.getCreateJobPage);

app.get("/jobs/:id/update", auth, recController.getUpdateJobPage);
app.post("/jobs/:id/update", auth, recController.handleUpdateJob);

app.get("/jobs/:id/delete", auth, recController.handleDeleteJob);

app.get("/jobs/:id/applicants", auth, recController.getApplicantsPage);
app.get("/applicants", auth, recController.getAllApplicantsPage);

// Error page routes, visible to all

app.get("/access-denied", appController.getAccessDeniedPage);

app.get("/404", appController.getError404Page);
app.get("*", appController.getError404Page);

export default app;
