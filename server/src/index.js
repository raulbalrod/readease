import app from "./app.js";
import config from "./config.js";
import cron from "node-cron";
import axios from "axios";

const { port } = config;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Cron job simple cada 10 minutos
cron.schedule("*/10 * * * *", async () => {
  try {
    // Usar RENDER_EXTERNAL_URL si está disponible, sino API_URL
    const url = process.env.RENDER_EXTERNAL_URL || config.deployUrl || `http://localhost:${port}`;
    const response = await axios.get(`${url}/health`, { timeout: 30000 });
    console.log(`✅ Keep-alive ping successful: ${response.status}`);
  } catch (error) {
    console.log(`⚠️ Keep-alive ping failed: ${error.message}`);
  }
});
