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
    // Usar API_URL desde variables de entorno
    const url = config.deployUrl;
    if (!url) {
      console.log("⚠️ API_URL no está configurada, omitiendo keep-alive ping");
      return;
    }
    const response = await axios.get(`${url}/health`, { timeout: 30000 });
    console.log(`✅ Keep-alive ping successful: ${response.status}`);
  } catch (error) {
    console.log(`⚠️ Keep-alive ping failed: ${error.message}`);
  }
});
