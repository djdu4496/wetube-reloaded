import "./db.js";
import "./models/Video.js";
import app from "./server.js";

const PORT = 4000;

// 3. App 외부에 개방하기

const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening); 