import app from "./app.js";
import { PORT } from "./config/config.js";
import { dbConnection } from "./config/dbConnection.js";
dbConnection();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
