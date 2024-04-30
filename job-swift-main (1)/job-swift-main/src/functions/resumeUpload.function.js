import multer from "multer";

const storageConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads/");
	},
	filename: (req, file, cb) => {
		const name = Date.now() + "-" + file.originalname;
		cb(null, name);
	},
});

export const resumeUpload = multer({ storage: storageConfig });
