import express from 'express';
import path from 'path';
import { connectSQL, validSession, getActivitiesByUser, setNewActivitiesByUser } from './db.js';

const app = express();
const port = 8080;
const dir = path.resolve();
const dirFront = "build";

app.use(express.static(dirFront));
app.use(express.json());

app.listen(port, () => {
  console.log("Start server")
});

app.get("/login", (req, resp) => {
  resp.sendFile(`${dir}/${dirFront}/index.html`);
});

app.get("/home", (req, resp) => {
  resp.sendFile(`${dir}/${dirFront}/index.html`);
});

app.post("/validate-login", (req, res) => {
  let responseSql = null;
  let isError = false;
  const { username, password } = req.body;
  validSession(username, password, (error, result) => {
        if(!error){
            responseSql = JSON.parse(JSON.stringify(result))?.[0];
            isError = !responseSql;
            const response =  isError ? 'Error: Usuario o contraseña invalida!' : responseSql;
            res.status(200).json({ isError, response});
        }
        else{
            isError = true;
            res.status(500);
        }
    });
})

app.get("/activities-by-user", (req, res) => {
  let responseSql = null;
  let isError = false;
  const { userId } = req.query;
  getActivitiesByUser(userId, (error, result) => {
      if(!error){
          responseSql = JSON.parse(JSON.stringify(result));
          isError = !responseSql;
          const response =  isError ? 'No se encontraron datos!' : responseSql;
          res.status(200).json({ isError, response});
      }
      else{
          isError = true;
          res.status(500);
      }
  });
})

app.post("/new-activity", (req, res) => {
  let responseSql = null;
  let isError = false;
  setNewActivitiesByUser(req.body, (error, result) => {
      if(!error){
          responseSql = JSON.parse(JSON.stringify(result));
          isError = !responseSql;
          const response =  isError ? 'No se encontraron datos!' : responseSql;
          res.status(200).json({ isError, response});
      }
      else{
          isError = true;
          res.status(500);
      }
  });
})

app.get("*", (req, resp) => {
  resp.sendFile(`${dir}/${dirFront}/index.html`);
});
