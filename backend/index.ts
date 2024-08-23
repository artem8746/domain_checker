import { createServer } from "./createServer";

const port = process.env.PORT || 5000;

createServer().listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});