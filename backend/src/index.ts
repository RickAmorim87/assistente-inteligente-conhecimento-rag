import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./database/neo4j";
import uploadRoutes from "./routes/upload.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(uploadRoutes);
app.get("/teste-rota", (_, res) => {
  res.json({
    rota: "funcionando"
  });
});

app.get("/", (_, res) => {
  res.json({
    project: "AI Knowledge Assistant",
    status: "running"
  });
});


app.post("/chat", (req, res) => {

  res.json({
    answer: "Pipeline RAG preparado.",
    question: req.body.question
  });

});


async function start(){

  await testConnection();

  app.listen(3000, () => {
    console.log("Backend running on port 3000");
  });

}


start();