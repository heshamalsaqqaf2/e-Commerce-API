import app from './app.js';
import config from './config/server.config.js';

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});