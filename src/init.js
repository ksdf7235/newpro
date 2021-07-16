import "./db";
import "./model/board";
import app from "./server"

const PORT = 7235;


const handleListening = () =>
console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`)

app.listen(PORT,handleListening);