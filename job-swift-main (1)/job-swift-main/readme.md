# Job Swift - Job Portal Website

## Project Description

Job Swift is a comprehensive job portal website designed to streamline the recruitment process. It provides a user-friendly platform for recruiters to post and manage job listings effortlessly, while job seekers can find and apply for suitable roles seamlessly.

## Project Structure

### Public Folder

-   **css Folder**

    -   `index.css`: Styles for the web app.

-   **img Folder**: Contains images used in the application.

-   **js Folder**: Front-end JavaScript functions.

-   **uploads Folder**: Uploaded resumes by applicants.

### Src Folder

-   **controllers Folder**

    -   `app.controller.js`: Manages requests for home page, error404 page, and access denied page.
    -   `job.controller.js`: Handles job details, search, and application functionality.
    -   `recruiter.controller.js`: Manages job creation, update, deletion, and applicant retrieval functionalities.
    -   `user.controller.js`: Handles user registration, login, and logout functions.

-   **functions Folder**

    -   `resumeUpload.function.js`: Functions related to resume uploads.
    -   `sendEmail.function.js`: Functions for sending emails.

-   **middlewares Folder**

    -   `auth.middleware.js`: Middleware for authentication.
    -   `lastVisit.middleware.js`: Middleware for tracking user last visit.

-   **models Folder**

    -   `job.model.js`: Contains information about created jobs and skills displayed on the create job page.
    -   `recruiter.model.js`: Stores details of registered recruiters.

-   **views Folder**: Contains all EJS templates rendered by the controllers.

### index.js

Express.js is initialized here, and routes are declared.

### server.js

The server created in `index.js` is set to listen in this file.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm i`.
3. Run the server using `node server.js`.
4. Access the application through "localhost:3000".

# Features

-   **Sleek and Minimalist Design:**

    -   A visually appealing and user-friendly interface with a sleek and minimalist design.

-   **Job Search Function:**

    -   Powerful search functionality for job seekers to find relevant opportunities.

-   **Job Apply Function:**

    -   Seamless application process for job seekers to apply for desired positions.

-   **Confirmation Email on Successful Application:**

    -   Automated email notifications to applicants upon successful job application.

-   **Last Visit Tracking for Personalization:**

    -   Personalized user experience through tracking and utilizing last visit information.

-   **Recruiter Login (Authentication):**
    -   Secure authentication for recruiters to access their accounts.
-   **Recruiters Can Create, Update, Delete Jobs:**

    -   Full control for recruiters to manage job listings with create, update, and delete capabilities.

-   **Recruiters Can View Applicants Details and Resumes:**
    -   Detailed insights into applicant information, including resumes, for effective recruitment.
  
> **Note:** If you intend to use the Email functionality in `src/functions/sendEmail.function.js`, please ensure to replace the placeholder email ID and app password with your own email ID and app password for proper functionality.
___

**Happy Job Hunting!**
