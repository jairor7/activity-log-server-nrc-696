import Express from "express";
import Path from "path";

const app = Express();
const port = 5000;
const dir = Path.resolve();
const dirFront = "build";

app.use(Express.static(dirFront));

app.listen(port, () => {
  console.log("Start server");
});

app.get("/login", (req, resp) => {
  resp.sendFile(`${dir}/${dirFront}/index.html`);
});

app.get("/home", (req, resp) => {
  resp.sendFile(`${dir}/${dirFront}/index.html`);
});

app.get("*", (req, resp) => {
  resp.sendFile(`${dir}/${dirFront}/index.html`);
});
