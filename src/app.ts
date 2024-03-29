import express from "express";

import routes from "./route";

const app = express();
const PORT = 3000;

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(
    "Server is Successfully Running,and App is listening on port " + PORT
  );
});
