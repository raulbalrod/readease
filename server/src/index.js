import app from "./app.js";
import config from "./config.js";

const { port } = config;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

cron.schedule("*/14 * * * *", async () => {
  try {
    const response = await axios.get(`${deployUrl}/books/landing`);
    console.log(`Ping exitoso a ${deployUrl}: ${response.data}`);
  } catch (error) {
    console.error(`Error al hacer ping: ${error.message}`);
  }
});
