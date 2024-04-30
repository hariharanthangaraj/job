import nodemailer from "nodemailer";

const SERVICE = "gmail";
const EMAIL_ID = "________________";
const APP_PASSWORD = "________________";

const transporter = nodemailer.createTransport({
	service: SERVICE,
	auth: { user: EMAIL_ID, pass: APP_PASSWORD },
});

async function sendMail(recipient, jobDesignation, companyName) {
	const subject = "Thank You for Your Job Application with Job Swift";
	const body = `Dear Applicant,

    Thank you for applying to Job Swift! We appreciate your interest in the ${jobDesignation} role at ${companyName}, and we are excited to review your application.
    
    Here are the details you provided in your application:
    
    • Name: ${recipient.name}
    • Email: ${recipient.email}
    • Contact Number: ${recipient.contact}

    To proceed with your application, we kindly request you to verify the accuracy of the provided details. If any adjustments are necessary, please inform us at your earliest convenience by replying to this email.
    
    Our dedicated team of recruiters will be reviewing your application, and you can expect to be contacted soon for the next steps in the hiring process. Please ensure that your contact information is accurate, as this will be the primary means of communication.
    
    For any further inquiries or assistance, feel free to reach out to us at jobswift@gmail.com. We are here to help and provide you with the information you need.
    
    Once again, congratulations on taking the first step toward joining Job Swift! We look forward to the possibility of working together.
    
    Best regards,
    Job Swift Team`;

	const mailOptions = {
		from: "goppykrishna7077@gmail.com",
		to: recipient.email,
		subject: subject,
		text: body,
	};

	try {
		await transporter.sendMail(mailOptions);

		console.log("Sent mail");
	} catch (err) {
		console.log(
			"Email Send to " + recipient.email + " Failed : " + err.message
		);
	}
}

export default sendMail;
