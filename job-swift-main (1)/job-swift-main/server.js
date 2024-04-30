import app from "./index.js";

const PORT = 3000;

app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Go to : http://localhost:${PORT}/`);
});